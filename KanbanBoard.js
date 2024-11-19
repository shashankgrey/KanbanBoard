import React, { useState, useEffect } from "react";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const mockTickets = [
    { id: "CAM-1", title: "Update User Profile Page UI", priority: 3, user: "John Doe", status: "Todo" },
    { id: "CAM-2", title: "Implement Email Notification System", priority: 4, user: "Alice Smith", status: "Todo" },
    { id: "CAM-3", title: "Optimize Database Queries for Performance", priority: 2, user: "Mark Green", status: "In Progress" },
    { id: "CAM-4", title: "Enhance Search Functionality", priority: 1, user: "Sarah Brown", status: "Done" },
    { id: "CAM-5", title: "Create API Documentation", priority: 0, user: "Emily White", status: "In Progress" },
    { id: "CAM-6", title: "Integrate Payment Gateway", priority: 4, user: "Sarah Brown", status: "Done" },
    { id: "CAM-7", title: "Update Marketing Dashboard", priority: 0, user: "John Doe", status: "In Progress" },

  ];

  const [tickets, setTickets] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "status");

  useEffect(() => {
    setTickets(mockTickets);
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
      const key = ticket[groupBy];
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (priorityFilter === "All") return true;
    if (priorityFilter === "Urgent" && ticket.priority === 4) return true;
    if (priorityFilter === "High" && ticket.priority === 3) return true;
    if (priorityFilter === "Medium" && ticket.priority === 2) return true;
    if (priorityFilter === "Low" && ticket.priority === 1) return true;
    if (priorityFilter === "No Priority" && ticket.priority === 0) return true;
    return false;
  });

  const groupedTickets = groupTickets(filteredTickets, grouping);

  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];

  return (
    <div className="kanban-container">
      <div className="controls">
        <div>
          <label>Grouping:</label>
          <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div>
          <label>Filter by Priority:</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="No Priority">No Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="kanban-group">
            <div className="group-header">
              <h3>{group}</h3>
              <span>{tickets.length} tasks</span>
            </div>
            <div className="kanban-group-content">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`kanban-card priority-${ticket.priority}`}
                >
                  <h4 className="card-title">{ticket.title}</h4>
                  <p className="card-meta">ID: {ticket.id}</p>
                  <p className="card-priority">
                    Priority: <span>{priorityLabels[ticket.priority]}</span>
                  </p>
                  <p className="card-user">
                    Assigned To: <span>{ticket.user}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
