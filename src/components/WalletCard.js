import React from "react";
import "./wallet.css";

export default function Wallet() {
    const transactions = [
        {
            id: "TXN1001",
            booking: "Airport Pickup",
            amount: "₹250",
            status: "Credited",
            date: "01 Aug 2026"
        },
        {
            id: "TXN1002",
            booking: "Outstation Round Trip",
            amount: "₹1,200",
            status: "Pending",
            date: "30 Jul 2026"
        },
        {
            id: "TXN1003",
            booking: "Wedding Transport",
            amount: "₹850",
            status: "Credited",
            date: "28 Jul 2026"
        }
    ];

    return (
        <div className="container-fluid wallet-page">
            <div className="wallet-header">
                <h2>Hotel Wallet</h2>
                <p>Manage your commissions and earnings.</p>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-md-6">
                    <div className="wallet-card balance">
                        <h6>Total Balance</h6>
                        <h2>₹24,500</h2>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="wallet-card available">
                        <h6>Available</h6>
                        <h2>₹18,200</h2>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="wallet-card pending">
                        <h6>Pending</h6>
                        <h2>₹4,800</h2>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="wallet-card earnings">
                        <h6>Total Earnings</h6>
                        <h2>₹1,24,750</h2>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-4">
                    <div className="summary-card">
                        <h5>Commission Summary</h5>
                        <div className="summary-item">
                            <span>Airport Transfers</span>
                            <strong>₹8,450</strong>
                        </div>
                        <div className="summary-item">
                            <span>Outstation</span>
                            <strong>₹28,700</strong>
                        </div>
                        <div className="summary-item">
                            <span>Rentals</span>
                            <strong>₹15,200</strong>
                        </div>
                        <div className="summary-item">
                            <span>Events</span>
                            <strong>₹32,600</strong>
                        </div>
                        <div className="summary-item">
                            <span>Transport</span>
                            <strong>₹39,800</strong>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="transaction-card">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Transaction</th>
                                        <th>Service</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.booking}</td>
                                            <td>{item.amount}</td>                                            <td>
                                                <span
                                                    className={
                                                        item.status === "Credited"
                                                            ? "status success"
                                                            : "status pending"
                                                    }
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>{item.date}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}