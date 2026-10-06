import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  HelpCircle,
  Hotel,
  Info,
  LoaderCircle,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Route,
  ShieldCheck,
  Star,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./out.css";

/* =========================================================
   CONSTANTS
========================================================= */

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org";

const OSRM_URL =
  "https://router.project-osrm.org/route/v1/driving";

const DEFAULT_CENTER = [
  17.6868,
  83.2185,
];

/*
  Fixed planning speed.
  OSRM provides actual road distance.
  ETA is recalculated using 60 km/h.
*/
const ROUTE_SPEED_KMH = 60;

/*
  ZestGo pricing
  --------------------------------
  One Way    = ₹21 / km
  Round Trip = ₹30 / km

  For round trip:
  Billable distance =
  One-way OSRM distance × 2
*/
const ONE_WAY_RATE_PER_KM = 21;
const ROUND_TRIP_RATE_PER_KM = 15;

const MINIMUM_FARE = 350;

const HOTEL_COMMISSION_PERCENT = 10;

/* =========================================================
   LEAFLET ICONS
========================================================= */

const pickupIcon = new L.DivIcon({
  className:
    "zg-map-marker-wrapper",

  html: `
    <div class="zg-map-marker zg-map-marker-pickup">
      <span>●</span>
    </div>
  `,

  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const dropIcon = new L.DivIcon({
  className:
    "zg-map-marker-wrapper",

  html: `
    <div class="zg-map-marker zg-map-marker-drop">
      <span>●</span>
    </div>
  `,

  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const viaIcon = new L.DivIcon({
  className:
    "zg-map-marker-wrapper",

  html: `
    <div class="zg-map-marker zg-map-marker-via">
      <span>●</span>
    </div>
  `,

  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

/* =========================================================
   HELPERS
========================================================= */

const isValidCoordinate = (
  latitude,
  longitude
) => {
  return (
    Number.isFinite(
      Number(latitude)
    ) &&
    Number.isFinite(
      Number(longitude)
    ) &&
    Number(latitude) >= -90 &&
    Number(latitude) <= 90 &&
    Number(longitude) >= -180 &&
    Number(longitude) <= 180
  );
};

const isValidLocation = (
  location
) => {
  return (
    location &&
    isValidCoordinate(
      location.lat,
      location.lng
    )
  );
};

const formatDistance = (
  meters
) => {
  if (
    !Number.isFinite(
      Number(meters)
    ) ||
    Number(meters) <= 0
  ) {
    return "0 km";
  }

  const km =
    Number(meters) / 1000;

  if (km < 1) {
    return `${Math.round(
      Number(meters)
    )} m`;
  }

  return `${km.toFixed(1)} km`;
};

/*
  Fixed 60 km/h ETA.
*/
const calculateEstimatedDuration = (
  meters
) => {
  if (
    !Number.isFinite(
      Number(meters)
    ) ||
    Number(meters) <= 0
  ) {
    return 0;
  }

  const distanceKm =
    Number(meters) / 1000;

  const hours =
    distanceKm /
    ROUTE_SPEED_KMH;

  return Math.ceil(
    hours * 60
  );
};

const formatDuration = (
  secondsOrMinutes,
  mode = "seconds"
) => {
  if (
    !Number.isFinite(
      Number(secondsOrMinutes)
    ) ||
    Number(secondsOrMinutes) <= 0
  ) {
    return "0 min";
  }

  let minutes;

  if (mode === "minutes") {
    minutes = Math.ceil(
      Number(secondsOrMinutes)
    );
  } else {
    minutes = Math.ceil(
      Number(secondsOrMinutes) /
        60
    );
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours =
    Math.floor(minutes / 60);

  const remaining =
    minutes % 60;

  if (remaining === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remaining} min`;
};

const formatCurrency = (
  amount
) => {
  return `₹${Number(
    amount || 0
  ).toLocaleString("en-IN")}`;
};

const getLocationName = (
  location
) => {
  if (!location) {
    return "";
  }

  if (
    typeof location ===
    "string"
  ) {
    return location;
  }

  return location.name || "";
};

const createEmptyLocation =
  () => ({
    name: "",
    lat: null,
    lng: null,
  });

/* =========================================================
   LOCATION AUTOCOMPLETE
========================================================= */

function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  allowCurrentLocation = false,
}) {
  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [
    locationLoading,
    setLocationLoading,
  ] = useState(false);

  const [open, setOpen] =
    useState(false);

  const wrapperRef =
    useRef(null);

  const requestRef =
    useRef(0);

  const abortControllerRef =
    useRef(null);

  const inputValue =
    getLocationName(value);

  /* -------------------------------------------------------
     CLOSE OUTSIDE
  ------------------------------------------------------- */

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* -------------------------------------------------------
     NOMINATIM AUTOCOMPLETE
  ------------------------------------------------------- */

  useEffect(() => {
    const searchText =
      inputValue.trim();

    if (
      searchText.length < 2
    ) {
      setSuggestions([]);
      setLoading(false);

      if (
        abortControllerRef.current
      ) {
        abortControllerRef.current.abort();
      }

      return undefined;
    }

    const requestId =
      ++requestRef.current;

    const timer = setTimeout(
      async () => {
        if (
          abortControllerRef.current
        ) {
          abortControllerRef.current.abort();
        }

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;

        try {
          setLoading(true);

          const url =
            `${NOMINATIM_URL}/search` +
            `?format=jsonv2` +
            `&addressdetails=1` +
            `&limit=7` +
            `&countrycodes=in` +
            `&q=${encodeURIComponent(
              searchText
            )}`;

          const response =
            await fetch(url, {
              signal:
                controller.signal,

              headers: {
                Accept:
                  "application/json",
              },
            });

          if (!response.ok) {
            throw new Error(
              "Location search failed"
            );
          }

          const data =
            await response.json();

          if (
            requestId !==
            requestRef.current
          ) {
            return;
          }

          setSuggestions(
            Array.isArray(data)
              ? data
              : []
          );

          setOpen(true);
        } catch (error) {
          if (
            error?.name ===
            "AbortError"
          ) {
            return;
          }

          console.error(
            "OpenStreetMap search error:",
            error
          );

          if (
            requestId ===
            requestRef.current
          ) {
            setSuggestions([]);
          }
        } finally {
          if (
            requestId ===
            requestRef.current
          ) {
            setLoading(false);
          }
        }
      },
      450
    );

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  /* -------------------------------------------------------
     SELECT SEARCH RESULT
  ------------------------------------------------------- */

  const selectLocation = (
    location
  ) => {
    const latitude =
      Number(location.lat);

    const longitude =
      Number(location.lon);

    if (
      !isValidCoordinate(
        latitude,
        longitude
      )
    ) {
      return;
    }

    const selectedLocation = {
      name:
        location.display_name ||
        location.name ||
        "",

      lat: latitude,
      lng: longitude,

      placeId:
        location.place_id,

      source: "nominatim",
    };

    onChange(
      selectedLocation
    );

    setSuggestions([]);
    setOpen(false);
  };

  /* -------------------------------------------------------
     CURRENT LOCATION
  ------------------------------------------------------- */

  const useCurrentLocation =
    () => {
      if (
        !navigator.geolocation
      ) {
        alert(
          "Your browser does not support location services."
        );

        return;
      }

      setLocationLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          try {
            const response =
              await fetch(
                `${NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                {
                  headers: {
                    Accept:
                      "application/json",
                  },
                }
              );

            if (!response.ok) {
              throw new Error(
                "Reverse geocoding failed"
              );
            }

            const data =
              await response.json();

            onChange({
              name:
                data.display_name ||
                "Current Location",

              lat,
              lng,

              source:
                "current-location",
            });

            setSuggestions([]);
            setOpen(false);
          } catch (error) {
            console.error(
              "Reverse geocoding error:",
              error
            );

            onChange({
              name:
                "Current Location",

              lat,
              lng,

              source:
                "current-location",
            });

            setSuggestions([]);
            setOpen(false);
          } finally {
            setLocationLoading(
              false
            );
          }
        },

        (error) => {
          console.error(
            "Browser geolocation error:",
            error
          );

          setLocationLoading(
            false
          );

          if (
            error.code ===
            error.PERMISSION_DENIED
          ) {
            alert(
              "Location permission was denied. Please allow location access in your browser."
            );
          } else if (
            error.code ===
            error.POSITION_UNAVAILABLE
          ) {
            alert(
              "Your current location could not be detected."
            );
          } else if (
            error.code ===
            error.TIMEOUT
          ) {
            alert(
              "Location request timed out. Please try again."
            );
          } else {
            alert(
              "Unable to get your current location."
            );
          }
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    };

  return (
    <div
      className="zg-autocomplete"
      ref={wrapperRef}
    >
      <div className="zg-autocomplete-input-wrapper">
        <MapPin
          size={18}
          className="zg-autocomplete-icon"
        />

        <input
          type="text"
          value={inputValue}
          placeholder={
            placeholder
          }
          className="zg-autocomplete-input"
          autoComplete="off"
          onChange={(event) => {
            onChange({
              name:
                event.target.value,

              lat: null,
              lng: null,
            });

            setOpen(true);
          }}
          onFocus={() => {
            if (
              inputValue.length >=
              2
            ) {
              setOpen(true);
            }
          }}
        />

        {loading && (
          <LoaderCircle
            size={18}
            className="zg-autocomplete-loader"
          />
        )}
      </div>

      {open && (
        <div className="zg-autocomplete-dropdown">
          {allowCurrentLocation && (
            <button
              type="button"
              className="zg-current-location-option"
              onClick={
                useCurrentLocation
              }
              disabled={
                locationLoading
              }
            >
              {locationLoading ? (
                <LoaderCircle
                  size={18}
                  className="zg-autocomplete-spin"
                />
              ) : (
                <Navigation
                  size={18}
                />
              )}

              <span>
                {locationLoading
                  ? "Detecting your location..."
                  : "Use Current Location"}
              </span>
            </button>
          )}

          {suggestions.length >
            0 && (
            <div className="zg-autocomplete-results">
              {suggestions.map(
                (location) => (
                  <button
                    type="button"
                    key={
                      location.place_id
                    }
                    className="zg-autocomplete-item"
                    onClick={() =>
                      selectLocation(
                        location
                      )
                    }
                  >
                    <MapPin
                      size={17}
                    />

                    <span>
                      <strong>
                        {location.name ||
                          location
                            .address
                            ?.road ||
                          location.display_name?.split(
                            ","
                          )[0]}
                      </strong>

                      <small>
                        {
                          location.display_name
                        }
                      </small>
                    </span>
                  </button>
                )
              )}
            </div>
          )}

          {!loading &&
            inputValue.length >=
              2 &&
            suggestions.length ===
              0 && (
              <div className="zg-autocomplete-empty">
                No locations found
              </div>
            )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DRIVING ROUTE HOOK
========================================================= */

function useDrivingRoute(
  pickup,
  drop,
  via = []
) {
  const [route, setRoute] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    const pickupValid =
      isValidLocation(pickup);

    const dropValid =
      isValidLocation(drop);

    if (
      !pickupValid ||
      !dropValid
    ) {
      setRoute(null);
      setLoading(false);
      setError("");

      return undefined;
    }

    const validVia = (
      via || []
    ).filter(isValidLocation);

    const coordinates = [
      pickup,
      ...validVia,
      drop,
    ]
      .map(
        (location) =>
          `${Number(
            location.lng
          )},${Number(
            location.lat
          )}`
      )
      .join(";");

    const controller =
      new AbortController();

    const fetchRoute = async () => {
      try {
        setLoading(true);
        setError("");

        const url =
          `${OSRM_URL}/${coordinates}` +
          `?overview=full` +
          `&geometries=geojson` +
          `&steps=false` +
          `&alternatives=false`;

        const response =
          await fetch(url, {
            signal:
              controller.signal,

            headers: {
              Accept:
                "application/json",
            },
          });

        if (!response.ok) {
          throw new Error(
            `OSRM HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        if (
          data.code !== "Ok"
        ) {
          throw new Error(
            data.message ||
              "Unable to calculate route"
          );
        }

        const firstRoute =
          data.routes?.[0];

        if (!firstRoute) {
          throw new Error(
            "No driving route found"
          );
        }

        const rawCoordinates =
          firstRoute.geometry
            ?.coordinates;

        if (
          !Array.isArray(
            rawCoordinates
          ) ||
          rawCoordinates.length <
            2
        ) {
          throw new Error(
            "Route geometry was not returned"
          );
        }

        const routeCoordinates =
          rawCoordinates
            .map(
              (coordinate) => {
                if (
                  !Array.isArray(
                    coordinate
                  ) ||
                  coordinate.length <
                    2
                ) {
                  return null;
                }

                const lng =
                  Number(
                    coordinate[0]
                  );

                const lat =
                  Number(
                    coordinate[1]
                  );

                if (
                  !isValidCoordinate(
                    lat,
                    lng
                  )
                ) {
                  return null;
                }

                return [
                  lat,
                  lng,
                ];
              }
            )
            .filter(Boolean);

        if (
          routeCoordinates.length <
          2
        ) {
          throw new Error(
            "Valid route geometry is unavailable"
          );
        }

        const distance =
          Number(
            firstRoute.distance
          );

        const estimatedMinutes =
          calculateEstimatedDuration(
            distance
          );

        if (cancelled) {
          return;
        }

        setRoute({
          distance,

          duration:
            estimatedMinutes * 60,

          estimatedMinutes,

          geometry:
            routeCoordinates,

          raw: firstRoute,
        });

        setError("");
      } catch (routeError) {
        if (
          routeError?.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "OSRM route error:",
          routeError
        );

        if (!cancelled) {
          setRoute(null);

          setError(
            "Unable to calculate the driving route. Please check the selected locations and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchRoute();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [pickup, drop, via]);

  return {
    route,
    loading,
    error,
  };
}

/* =========================================================
   MAP RESIZE FIX
========================================================= */

function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return undefined;
    }

    const resizeMap = () => {
      setTimeout(() => {
        map.invalidateSize(true);
      }, 50);
    };

    resizeMap();

    let observer = null;

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      const container =
        map.getContainer();

      observer =
        new ResizeObserver(() => {
          map.invalidateSize(
            true
          );
        });

      observer.observe(container);
    }

    window.addEventListener(
      "resize",
      resizeMap
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeMap
      );

      if (observer) {
        observer.disconnect();
      }
    };
  }, [map]);

  return null;
}

/* =========================================================
   MAP AUTO FIT
========================================================= */

function MapAutoFit({
  points,
  routeCoordinates,
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const validPoints = [
      ...(routeCoordinates ||
        []),

      ...(points || []),
    ].filter(
      (point) =>
        Array.isArray(point) &&
        point.length === 2 &&
        isValidCoordinate(
          point[0],
          point[1]
        )
    );

    if (
      validPoints.length === 0
    ) {
      return;
    }

    const bounds =
      L.latLngBounds(
        validPoints
      );

    if (!bounds.isValid()) {
      return;
    }

    setTimeout(() => {
      map.invalidateSize(
        true
      );

      map.fitBounds(bounds, {
        padding: [
          45,
          45,
        ],

        maxZoom: 14,

        animate: true,
      });
    }, 100);
  }, [
    map,
    points,
    routeCoordinates,
  ]);

  return null;
}

/* =========================================================
   ROUTE MAP
========================================================= */

function RouteMap({
  pickup,
  drop,
  via = [],
  route,
  routeLoading = false,
  routeError = "",
}) {
  const validPickup =
    isValidLocation(pickup);

  const validDrop =
    isValidLocation(drop);

  const validVia = (
    via || []
  ).filter(isValidLocation);

  const points = [
    ...(validPickup
      ? [
          [
            Number(pickup.lat),
            Number(pickup.lng),
          ],
        ]
      : []),

    ...validVia.map(
      (location) => [
        Number(location.lat),
        Number(location.lng),
      ]
    ),

    ...(validDrop
      ? [
          [
            Number(drop.lat),
            Number(drop.lng),
          ],
        ]
      : []),
  ];

  const routeCoordinates =
    Array.isArray(
      route?.geometry
    )
      ? route.geometry.filter(
          (point) =>
            Array.isArray(point) &&
            point.length === 2 &&
            isValidCoordinate(
              point[0],
              point[1]
            )
        )
      : [];

  if (!points.length) {
    return (
      <div className="zg-route-map zg-route-map-empty">
        <MapPin size={26} />

        <span>
          Select pickup and drop
          locations to view the
          route.
        </span>
      </div>
    );
  }

  const center =
    points[0] ||
    DEFAULT_CENTER;

  const mapKey = points
    .map(
      (point) =>
        `${point[0]}-${point[1]}`
    )
    .join("|");

  return (
    <div className="zg-route-map">
      <MapContainer
        key={mapKey}
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="zg-leaflet-map"
      >
        <MapResizeFix />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAutoFit
          points={points}
          routeCoordinates={
            routeCoordinates
          }
        />

        {/* PICKUP */}
        {validPickup && (
          <Marker
            position={[
              Number(pickup.lat),
              Number(pickup.lng),
            ]}
            icon={pickupIcon}
          >
            <Popup>
              <strong>
                Pickup
              </strong>

              <br />

              {pickup.name ||
                "Pickup location"}
            </Popup>
          </Marker>
        )}

        {/* VIA STOPS */}
        {validVia.map(
          (
            location,
            index
          ) => (
            <Marker
              key={`via-${index}-${location.lat}-${location.lng}`}
              position={[
                Number(
                  location.lat
                ),
                Number(
                  location.lng
                ),
              ]}
              icon={viaIcon}
            >
              <Popup>
                <strong>
                  Stop {index + 1}
                </strong>

                <br />

                {location.name ||
                  `Stop ${
                    index + 1
                  }`}
              </Popup>
            </Marker>
          )
        )}

        {/* DROP */}
        {validDrop && (
          <Marker
            position={[
              Number(drop.lat),
              Number(drop.lng),
            ]}
            icon={dropIcon}
          >
            <Popup>
              <strong>
                Drop
              </strong>

              <br />

              {drop.name ||
                "Drop location"}
            </Popup>
          </Marker>
        )}

        {/* ACTUAL OSRM ROUTE */}
        {routeCoordinates.length >
          1 && (
          <Polyline
            positions={
              routeCoordinates
            }
            pathOptions={{
              color:
                "#008f46",

              weight: 6,

              opacity: 0.9,

              lineCap: "round",

              lineJoin: "round",
            }}
          />
        )}
      </MapContainer>

      {/* MAP STATUS */}
      {routeLoading && (
        <div className="zg-map-status">
          <LoaderCircle
            size={17}
            className="zg-autocomplete-spin"
          />

          <span>
            Calculating driving
            route...
          </span>
        </div>
      )}

      {!routeLoading &&
        routeError && (
          <div className="zg-map-status zg-map-status-error">
            <Info size={17} />

            <span>
              Route could not be
              calculated.
            </span>
          </div>
        )}

      {!routeLoading &&
        !routeError &&
        points.length >= 2 &&
        routeCoordinates.length <
          2 && (
          <div className="zg-map-status">
            <Info size={17} />

            <span>
              Select valid pickup
              and drop locations.
            </span>
          </div>
        )}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <header className="zg-header">
      <div className="zg-header-left">
        <div className="zg-logo">
          <span className="zg-logo-main">
            ZestGo
          </span>

          <span className="zg-logo-sub">
            Hotel Partner
          </span>
        </div>

        <div className="zg-hotel-selector">
          <Hotel size={17} />

          <div>
            <strong>
              Your Hotel
            </strong>

            <small>
              Hotel Partner
            </small>
          </div>

          <ChevronDown
            size={16}
          />
        </div>

        <div className="zg-partner-badge">
          <Star size={14} />

          Premium Partner
        </div>
      </div>

      <div className="zg-header-right">
        <button
          type="button"
          className="zg-header-icon-button"
        >
          <Phone size={17} />
        </button>

        <button
          type="button"
          className="zg-help-button"
        >
          <HelpCircle
            size={17}
          />

          Help Center
        </button>

        <div className="zg-user-profile">
          <div className="zg-user-avatar">
            <User size={17} />
          </div>

          <div>
            <strong>
              Hotel Admin
            </strong>

            <small>
              Partner Account
            </small>
          </div>

          <ChevronDown
            size={15}
          />
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   BOOKING STEPS
========================================================= */

function BookingSteps({
  currentStep = 1,
}) {
  const steps = [
    {
      number: 1,
      label: "Trip Details",
    },

    {
      number: 2,
      label: "Vehicle",
    },

    {
      number: 3,
      label: "Guest Details",
    },

    {
      number: 4,
      label: "Confirmation",
    },
  ];

  return (
    <div className="zg-booking-steps">
      {steps.map(
        (step, index) => {
          const active =
            step.number ===
            currentStep;

          const completed =
            step.number <
            currentStep;

          return (
            <React.Fragment
              key={step.number}
            >
              <div
                className={`zg-step ${
                  active
                    ? "active"
                    : ""
                } ${
                  completed
                    ? "completed"
                    : ""
                }`}
              >
                <div className="zg-step-number">
                  {completed ? (
                    <CheckCircle2
                      size={18}
                    />
                  ) : (
                    step.number
                  )}
                </div>

                <span>
                  {step.label}
                </span>
              </div>

              {index <
                steps.length -
                  1 && (
                <div
                  className={`zg-step-line ${
                    completed
                      ? "completed"
                      : ""
                  }`}
                />
              )}
            </React.Fragment>
          );
        }
      )}
    </div>
  );
}

/* =========================================================
   TRIP DETAILS
========================================================= */

function TripDetails({
  trip,
  setTrip,
  route,
  routeLoading,
  routeError,
}) {
  const {
    pickup,
    drop,
    via,
    date,
    time,
    tripType,
    passengers,
    luggage,
  } = trip;

  const updateTrip = (
    field,
    value
  ) => {
    setTrip(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  };

  const addVia = () => {
    if (
      (via || []).length >= 3
    ) {
      return;
    }

    updateTrip("via", [
      ...(via || []),
      createEmptyLocation(),
    ]);
  };

  const updateVia = (
    index,
    value
  ) => {
    const updated = [
      ...(via || []),
    ];

    updated[index] = value;

    updateTrip(
      "via",
      updated
    );
  };

  const removeVia = (
    index
  ) => {
    const updated = [
      ...(via || []),
    ];

    updated.splice(index, 1);

    updateTrip(
      "via",
      updated
    );
  };

  /*
    DISPLAYED ROUTE METRICS

    The actual map route remains one-way.

    Round trip:
      distance = one-way × 2
      ETA      = one-way × 2
  */

  const routeMultiplier =
    tripType ===
    "round-trip"
      ? 2
      : 1;

  const billableDistance =
    route?.distance
      ? route.distance *
        routeMultiplier
      : 0;

  const billableMinutes =
    route?.estimatedMinutes
      ? route.estimatedMinutes *
        routeMultiplier
      : 0;

  return (
    <section className="zg-card zg-trip-details">
      <div className="zg-card-header">
        <div>
          <div className="zg-section-kicker">
            <Route size={16} />

            TRIP PLANNER
          </div>

          <h2>
            Trip Details
          </h2>

          <p>
            Enter the guest journey
            and we'll calculate the
            driving route
            automatically.
          </p>
        </div>

        <div className="zg-route-status-badge">
          <Navigation
            size={15}
          />

          OpenStreetMap
        </div>
      </div>

      {/* PICKUP / DROP */}
      <div className="zg-location-grid">
        <div className="zg-field-group">
          <label>
            Pickup Location
          </label>

          <LocationAutocomplete
            value={pickup}
            onChange={(value) =>
              updateTrip(
                "pickup",
                value
              )
            }
            placeholder="Enter pickup location"
            allowCurrentLocation={
              true
            }
          />

          <small className="zg-field-help">
            Use current location or
            search for a pickup point.
          </small>
        </div>

        <div className="zg-field-group">
          <label>
            Drop Location
          </label>

          <LocationAutocomplete
            value={drop}
            onChange={(value) =>
              updateTrip(
                "drop",
                value
              )
            }
            placeholder="Enter drop location"
            allowCurrentLocation={
              false
            }
          />
        </div>
      </div>

      {/* VIA STOPS */}
      <div className="zg-via-section">
        <div className="zg-via-header">
          <div>
            <label>
              Additional Stops
            </label>

            <small>
              Optional — add up to 3
              stops.
            </small>
          </div>

          {(via || []).length <
            3 && (
            <button
              type="button"
              className="zg-add-stop-button"
              onClick={addVia}
            >
              <Plus size={15} />

              Add Stop
            </button>
          )}
        </div>

        {(via || []).map(
          (
            location,
            index
          ) => (
            <div
              className="zg-via-row"
              key={`via-row-${index}`}
            >
              <div className="zg-via-number">
                {index + 1}
              </div>

              <LocationAutocomplete
                value={location}
                onChange={(
                  value
                ) =>
                  updateVia(
                    index,
                    value
                  )
                }
                placeholder={`Stop ${
                  index + 1
                }`}
                allowCurrentLocation={
                  false
                }
              />

              <button
                type="button"
                className="zg-remove-stop"
                onClick={() =>
                  removeVia(
                    index
                  )
                }
                aria-label="Remove stop"
              >
                <X size={17} />
              </button>
            </div>
          )
        )}
      </div>

      {/* DATE / TIME / TYPE */}
      <div className="zg-trip-options-grid">
        <div className="zg-field-group">
          <label>
            Travel Date
          </label>

          <div className="zg-input-wrapper">
            <CalendarDays
              size={17}
            />

            <input
              type="date"
              value={date}
              onChange={(event) =>
                updateTrip(
                  "date",
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="zg-field-group">
          <label>
            Pickup Time
          </label>

          <div className="zg-input-wrapper">
            <Clock3 size={17} />

            <input
              type="time"
              value={time}
              onChange={(event) =>
                updateTrip(
                  "time",
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="zg-field-group">
          <label>
            Trip Type
          </label>

          <div className="zg-input-wrapper">
            <Route size={17} />

            <select
              value={tripType}
              onChange={(event) =>
                updateTrip(
                  "tripType",
                  event.target.value
                )
              }
            >
              <option value="one-way">
                One Way
              </option>

              <option value="round-trip">
                Round Trip
              </option>
            </select>
          </div>
        </div>

        <div className="zg-field-group">
          <label>
            Passengers
          </label>

          <div className="zg-input-wrapper">
            <Users size={17} />

            <select
              value={passengers}
              onChange={(event) =>
                updateTrip(
                  "passengers",
                  Number(
                    event.target.value
                  )
                )
              }
            >
              {[1, 2, 3, 4, 5, 6, 7].map(
                (number) => (
                  <option
                    key={number}
                    value={number}
                  >
                    {number}{" "}
                    {number === 1
                      ? "Passenger"
                      : "Passengers"}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="zg-field-group">
          <label>
            Luggage
          </label>

          <div className="zg-input-wrapper">
            <Car size={17} />

            <select
              value={luggage}
              onChange={(event) =>
                updateTrip(
                  "luggage",
                  Number(
                    event.target.value
                  )
                )
              }
            >
              {[0, 1, 2, 3, 4, 5].map(
                (number) => (
                  <option
                    key={number}
                    value={number}
                  >
                    {number}{" "}
                    {number === 1
                      ? "Bag"
                      : "Bags"}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* ROUTE LOADING */}
      {routeLoading && (
        <div className="zg-route-loading">
          <LoaderCircle
            size={18}
            className="zg-autocomplete-spin"
          />

          <span>
            Calculating driving route
            at {ROUTE_SPEED_KMH} km/h...
          </span>
        </div>
      )}

      {/* ROUTE ERROR */}
      {routeError && (
        <div className="zg-route-error">
          <Info size={17} />

          <span>
            {routeError}
          </span>
        </div>
      )}

      {/* ROUTE INFORMATION */}
      {route && (
        <div className="zg-route-information">
          <div className="zg-route-information-heading">
            <div>
              <Route size={18} />

              <strong>
                Driving Route
              </strong>
            </div>

            <span>
              {tripType ===
              "round-trip"
                ? "ROUND TRIP"
                : "ONE WAY"}{" "}
              •{" "}
              {tripType ===
              "round-trip"
                ? `₹${ROUND_TRIP_RATE_PER_KM}/km`
                : `₹${ONE_WAY_RATE_PER_KM}/km`}
            </span>
          </div>

          <div className="zg-route-stats">
            <div>
              <small>
                Billable Distance
              </small>

              <strong>
                {formatDistance(
                  billableDistance
                )}
              </strong>
            </div>

            <div>
              <small>
                Estimated Drive Time
              </small>

              <strong>
                {formatDuration(
                  billableMinutes,
                  "minutes"
                )}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* MAP */}
      <RouteMap
        pickup={pickup}
        drop={drop}
        via={via}
        route={route}
        routeLoading={
          routeLoading
        }
        routeError={
          routeError
        }
      />
    </section>
  );
}

/* =========================================================
   POPULAR ROUTES
========================================================= */

function PopularRoutes({
  onSelectRoute,
}) {
  const routes = [
    {
      title:
        "Airport → Hotel",

      subtitle:
        "Visakhapatnam Airport",

      icon: "✈",
    },

    {
      title:
        "Hotel → Railway Station",

      subtitle:
        "Visakhapatnam Junction",

      icon: "🚆",
    },

    {
      title:
        "Hotel → Beach",

      subtitle: "RK Beach",

      icon: "🌊",
    },

    {
      title:
        "Hotel → City",

      subtitle:
        "Visakhapatnam",

      icon: "🏙",
    },
  ];

  return (
    <section className="zg-card zg-popular-routes">
      <div className="zg-card-header compact">
        <div>
          <div className="zg-section-kicker">
            <Star size={15} />

            QUICK BOOKING
          </div>

          <h2>
            Popular Routes
          </h2>
        </div>
      </div>

      <div className="zg-popular-grid">
        {routes.map(
          (routeItem) => (
            <button
              type="button"
              className="zg-popular-route"
              key={
                routeItem.title
              }
              onClick={() =>
                onSelectRoute(
                  routeItem
                )
              }
            >
              <div className="zg-popular-icon">
                {
                  routeItem.icon
                }
              </div>

              <div>
                <strong>
                  {
                    routeItem.title
                  }
                </strong>

                <small>
                  {
                    routeItem.subtitle
                  }
                </small>
              </div>
            </button>
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   ADDITIONAL PREFERENCES
========================================================= */

function AdditionalPreferences({
  preferences,
  setPreferences,
}) {
  const updatePreference = (
    field,
    value
  ) => {
    setPreferences(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  };

  return (
    <section className="zg-card zg-preferences">
      <div className="zg-card-header compact">
        <div>
          <div className="zg-section-kicker">
            <FileText
              size={15}
            />

            OPTIONAL
          </div>

          <h2>
            Additional Preferences
          </h2>
        </div>
      </div>

      <div className="zg-preferences-grid">
        <label className="zg-check-card">
          <input
            type="checkbox"
            checked={
              preferences.ac
            }
            onChange={(event) =>
              updatePreference(
                "ac",
                event.target
                  .checked
              )
            }
          />

          <span className="zg-custom-check">
            <CheckCircle2
              size={16}
            />
          </span>

          <span>
            <strong>
              AC Vehicle
            </strong>

            <small>
              Guest prefers air
              conditioning.
            </small>
          </span>
        </label>

        <label className="zg-check-card">
          <input
            type="checkbox"
            checked={
              preferences.childSeat
            }
            onChange={(event) =>
              updatePreference(
                "childSeat",
                event.target
                  .checked
              )
            }
          />

          <span className="zg-custom-check">
            <CheckCircle2
              size={16}
            />
          </span>

          <span>
            <strong>
              Child Seat
            </strong>

            <small>
              Required for child
              passenger.
            </small>
          </span>
        </label>

        <label className="zg-check-card">
          <input
            type="checkbox"
            checked={
              preferences.extraLuggage
            }
            onChange={(event) =>
              updatePreference(
                "extraLuggage",
                event.target
                  .checked
              )
            }
          />

          <span className="zg-custom-check">
            <CheckCircle2
              size={16}
            />
          </span>

          <span>
            <strong>
              Extra Luggage
            </strong>

            <small>
              Additional boot
              space.
            </small>
          </span>
        </label>
      </div>

      <div className="zg-preference-note">
        <Info size={15} />

        Preferences are subject
        to vehicle availability.
      </div>
    </section>
  );
}

/* =========================================================
   BENEFITS BANNER
========================================================= */

function BenefitsBanner() {
  return (
    <section className="zg-benefits-banner">
      <div className="zg-benefits-content">
        <div className="zg-benefits-icon">
          <ShieldCheck
            size={28}
          />
        </div>

        <div>
          <span>
            ZESTGO HOTEL PARTNER
            BENEFITS
          </span>

          <h3>
            Reliable rides for every
            guest journey.
          </h3>

          <p>
            Verified drivers,
            transparent pricing and
            dedicated hotel support.
          </p>
        </div>
      </div>

      <div className="zg-benefits-items">
        <div>
          <CheckCircle2
            size={16}
          />

          Verified Drivers
        </div>

        <div>
          <CheckCircle2
            size={16}
          />

          Live Trip Support
        </div>

        <div>
          <CheckCircle2
            size={16}
          />

          Hotel Commission
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BOOKING SUMMARY
========================================================= */

function BookingSummary({
  trip,
  route,
  vehicle,
  preferences,
  onContinue,
}) {
  /*
    IMPORTANT PRICING LOGIC

    ONE WAY:
      Distance = OSRM one-way distance
      Rate     = ₹21/km

    ROUND TRIP:
      Distance = OSRM one-way distance × 2
      Rate     = ₹30/km
  */

  const isRoundTrip =
    trip.tripType ===
    "round-trip";

  const tripMultiplier =
    isRoundTrip ? 2 : 1;

  const applicableRate =
    isRoundTrip
      ? ROUND_TRIP_RATE_PER_KM
      : ONE_WAY_RATE_PER_KM;

  /* -------------------------------------------------------
     BILLABLE DISTANCE
  ------------------------------------------------------- */

  const billableDistance =
    route?.distance
      ? route.distance *
        tripMultiplier
      : 0;

  const billableDistanceKm =
    billableDistance / 1000;

  /* -------------------------------------------------------
     BASE FARE
  ------------------------------------------------------- */

  const baseFare = useMemo(() => {
    if (
      !route?.distance
    ) {
      return 0;
    }

    const multiplier =
      trip.tripType ===
      "round-trip"
        ? 2
        : 1;

    const rate =
      trip.tripType ===
      "round-trip"
        ? ROUND_TRIP_RATE_PER_KM
        : ONE_WAY_RATE_PER_KM;

    const distanceKm =
      (route.distance / 1000) *
      multiplier;

    const distanceFare =
      distanceKm * rate;

    return Math.max(
      MINIMUM_FARE,
      Math.round(
        distanceFare
      )
    );
  }, [
    route,
    trip.tripType,
  ]);

  /* -------------------------------------------------------
     EXTRA CHARGES
  ------------------------------------------------------- */

  const preferenceCharges =
    (preferences?.childSeat
      ? 100
      : 0) +
    (preferences?.extraLuggage
      ? 100
      : 0);

  /* -------------------------------------------------------
     TOTAL
  ------------------------------------------------------- */

  const total =
    baseFare +
    preferenceCharges;

  /* -------------------------------------------------------
     HOTEL COMMISSION
  ------------------------------------------------------- */

  const commission =
    Math.round(
      (total *
        HOTEL_COMMISSION_PERCENT) /
        100
    );

  const hotelPayable =
    total - commission;

  /* -------------------------------------------------------
     ROUND TRIP ETA
  ------------------------------------------------------- */

  const displayedMinutes =
    route?.estimatedMinutes
      ? route.estimatedMinutes *
        tripMultiplier
      : 0;

  return (
    <aside className="zg-booking-summary">
      <div className="zg-summary-header">
        <div>
          <span>
            BOOKING SUMMARY
          </span>

          <h2>
            Trip Estimate
          </h2>
        </div>

        <div className="zg-summary-secure">
          <ShieldCheck
            size={15}
          />

          Secure
        </div>
      </div>

      {/* ROUTE */}
      <div className="zg-summary-route">
        <div className="zg-summary-route-row">
          <div className="zg-summary-dot pickup" />

          <div>
            <small>
              PICKUP
            </small>

            <strong>
              {getLocationName(
                trip.pickup
              ) ||
                "Not selected"}
            </strong>
          </div>
        </div>

        <div className="zg-summary-route-line" />

        <div className="zg-summary-route-row">
          <div className="zg-summary-dot drop" />

          <div>
            <small>
              DROP
            </small>

            <strong>
              {getLocationName(
                trip.drop
              ) ||
                "Not selected"}
            </strong>
          </div>
        </div>
      </div>

      {/* TRIP INFO */}
      <div className="zg-summary-info-grid">
        <div>
          <CalendarDays
            size={15}
          />

          <span>
            {trip.date ||
              "Select date"}
          </span>
        </div>

        <div>
          <Clock3 size={15} />

          <span>
            {trip.time ||
              "Select time"}
          </span>
        </div>

        <div>
          <Users size={15} />

          <span>
            {trip.passengers}{" "}
            Passenger
            {trip.passengers !==
            1
              ? "s"
              : ""}
          </span>
        </div>

        <div>
          <Car size={15} />

          <span>
            {vehicle?.name ||
              "Vehicle not selected"}
          </span>
        </div>
      </div>

      {/* TRIP TYPE */}
      <div className="zg-summary-trip-type">
        <div>
          <Route size={15} />

          <span>
            Trip Type
          </span>
        </div>

        <strong>
          {isRoundTrip
            ? "Round Trip"
            : "One Way"}
        </strong>
      </div>

      {/* DISTANCE / ETA */}
      {route && (
        <div className="zg-summary-distance">
          <Route size={15} />

          <span>
            {formatDistance(
              billableDistance
            )}
          </span>

          <span>
            •
          </span>

          <span>
            {formatDuration(
              displayedMinutes,
              "minutes"
            )}
          </span>

          <span>
            @ {ROUTE_SPEED_KMH} km/h
          </span>
        </div>
      )}

      {/* RATE */}
      {route && (
        <div className="zg-summary-rate">
          <span>
            Applicable Rate
          </span>

          <strong>
            ₹{applicableRate}/km
          </strong>
        </div>
      )}

      {/* FARE BREAKDOWN */}
      <div className="zg-fare-breakdown">
        <div className="zg-fare-heading">
          Fare Breakdown
        </div>

        <div className="zg-fare-row">
          <span>
            {isRoundTrip
              ? "Round Trip Fare"
              : "One Way Fare"}
          </span>

          <strong>
            {formatCurrency(
              baseFare
            )}
          </strong>
        </div>

        {preferences?.childSeat && (
          <div className="zg-fare-row">
            <span>
              Child Seat
            </span>

            <strong>
              ₹100
            </strong>
          </div>
        )}

        {preferences?.extraLuggage && (
          <div className="zg-fare-row">
            <span>
              Extra Luggage
            </span>

            <strong>
              ₹100
            </strong>
          </div>
        )}

        <div className="zg-fare-divider" />

        <div className="zg-fare-total">
          <span>
            Guest Total
          </span>

          <strong>
            {formatCurrency(
              total
            )}
          </strong>
        </div>
      </div>

      {/* HOTEL COMMISSION */}
      <div className="zg-hotel-commission">
        <div>
          <Wallet size={17} />

          <span>
            <strong>
              Hotel Commission
            </strong>

            <small>
              {
                HOTEL_COMMISSION_PERCENT
              }
              % partner benefit
            </small>
          </span>
        </div>

        <strong>
          -{formatCurrency(
            commission
          )}
        </strong>
      </div>

      {/* HOTEL PAYABLE */}
      <div className="zg-hotel-payable">
        <span>
          Hotel Payable
        </span>

        <strong>
          {formatCurrency(
            hotelPayable
          )}
        </strong>
      </div>

      {/* CONTINUE */}
      <button
        type="button"
        className="zg-continue-button"
        onClick={
          onContinue
        }
      >
        Continue Booking

        <Navigation
          size={18}
        />
      </button>

      {/* DRAFT */}
      <button
        type="button"
        className="zg-draft-button"
      >
        Save as Draft
      </button>

      <div className="zg-summary-footer">
        <ShieldCheck
          size={14}
        />

        Your booking details are
        protected.
      </div>
    </aside>
  );
}

/* =========================================================
   VEHICLE DATA
========================================================= */

const defaultVehicle = {
  id: "sedan",
  name: "Comfort Sedan",
  type: "Sedan",
};

/* =========================================================
   MAIN BOOKING PAGE
========================================================= */

export default function BookingPage() {
  const [
    currentStep,
    setCurrentStep,
  ] = useState(1);

  const [trip, setTrip] =
    useState({
      pickup:
        createEmptyLocation(),

      drop:
        createEmptyLocation(),

      via: [],

      date: "",
      time: "",

      tripType:
        "one-way",

      passengers: 2,

      luggage: 1,
    });

  const [
    preferences,
    setPreferences,
  ] = useState({
    ac: true,

    childSeat: false,

    extraLuggage: false,
  });

  const [
    vehicle,
    setVehicle,
  ] = useState(
    defaultVehicle
  );

  /*
    Route calculated ONLY HERE.
  */

  const {
    route,
    loading: routeLoading,
    error: routeError,
  } = useDrivingRoute(
    trip.pickup,
    trip.drop,
    trip.via
  );

  /* -------------------------------------------------------
     POPULAR ROUTES
  ------------------------------------------------------- */

  const handlePopularRoute =
    (routeItem) => {
      if (
        routeItem.title.includes(
          "Airport"
        )
      ) {
        setTrip(
          (previous) => ({
            ...previous,

            pickup: {
              name:
                "Visakhapatnam Airport",

              lat: 17.7215,

              lng: 83.2245,
            },

            drop: {
              name:
                "Visakhapatnam",

              lat: 17.6868,

              lng: 83.2185,
            },

            via: [],
          })
        );

        return;
      }

      if (
        routeItem.title.includes(
          "Railway"
        )
      ) {
        setTrip(
          (previous) => ({
            ...previous,

            pickup: {
              name:
                "Visakhapatnam Railway Station",

              lat: 17.7231,

              lng: 83.3013,
            },

            drop: {
              name:
                "Visakhapatnam",

              lat: 17.6868,

              lng: 83.2185,
            },

            via: [],
          })
        );

        return;
      }

      if (
        routeItem.title.includes(
          "Beach"
        )
      ) {
        setTrip(
          (previous) => ({
            ...previous,

            pickup: {
              name:
                "Visakhapatnam Hotel",

              lat: 17.708,

              lng: 83.301,
            },

            drop: {
              name: "RK Beach",

              lat: 17.7135,

              lng: 83.322,
            },

            via: [],
          })
        );

        return;
      }

      if (
        routeItem.title.includes(
          "City"
        )
      ) {
        setTrip(
          (previous) => ({
            ...previous,

            pickup: {
              name:
                "Visakhapatnam Hotel",

              lat: 17.708,

              lng: 83.301,
            },

            drop: {
              name:
                "Visakhapatnam City",

              lat: 17.6868,

              lng: 83.2185,
            },

            via: [],
          })
        );
      }
    };

  /* -------------------------------------------------------
     CONTINUE
  ------------------------------------------------------- */

  const handleContinue = () => {
    if (
      !isValidLocation(
        trip.pickup
      ) ||
      !isValidLocation(
        trip.drop
      )
    ) {
      alert(
        "Please select valid pickup and drop locations."
      );

      return;
    }

    if (routeLoading) {
      alert(
        "Please wait while the driving route is being calculated."
      );

      return;
    }

    if (!route) {
      alert(
        "A driving route could not be calculated. Please check the pickup and drop locations."
      );

      return;
    }

    setCurrentStep(
      (previous) =>
        Math.min(
          previous + 1,
          4
        )
    );
  };

  return (
    <div className="zg-page">
      <Header />

      <main className="zg-main">
        {/* PAGE TITLE */}
        <div className="zg-page-title">
          <div>
            <div className="zg-breadcrumb">
              Hotel Partner

              <span>
                /
              </span>

              New Booking
            </div>

            <h1>
              Create New Booking
            </h1>

            <p>
              Book a reliable ZestGo
              ride for your hotel
              guest.
            </p>
          </div>

          <div className="zg-page-title-right">
            <div className="zg-booking-id">
              <span>
                BOOKING ID
              </span>

              <strong>
                Auto Generated
              </strong>
            </div>
          </div>
        </div>

        {/* STEPS */}
        <BookingSteps
          currentStep={
            currentStep
          }
        />

        {/* BOOKING LAYOUT */}
        <div className="zg-booking-layout">
          <div className="zg-booking-content">
            <TripDetails
              trip={trip}
              setTrip={setTrip}
              route={route}
              routeLoading={
                routeLoading
              }
              routeError={
                routeError
              }
            />

            <PopularRoutes
              onSelectRoute={
                handlePopularRoute
              }
            />

            <AdditionalPreferences
              preferences={
                preferences
              }
              setPreferences={
                setPreferences
              }
            />

            <BenefitsBanner />
          </div>

          <BookingSummary
            trip={trip}
            route={route}
            vehicle={vehicle}
            preferences={
              preferences
            }
            onContinue={
              handleContinue
            }
          />
        </div>
      </main>
    </div>
  );
}