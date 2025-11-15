import React, { useState } from 'react';
import './ChatSidebar.css';
import api from '../../api';

const ChatSidebar = ({ chats, activeChatId, onSelectChat, onNewChat, open }) => {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  
  const handleEditClick = (e, chat) => {
    e.stopPropagation();
    setEditingChatId(chat._id);
    setEditTitle(chat.title);
  };

  const handleSaveEdit = async (e, chatId) => {
    e.stopPropagation();
    try {
      await api.put(`/api/chat/${chatId}`, { title: editTitle }, { withCredentials: true });
      setEditingChatId(null);
      window.location.reload(); // Temporary solution - should use state management instead
    } catch (err) {
      console.error('Failed to update chat:', err);
      alert('Failed to update chat title');
    }
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        await api.delete(`/api/chat/${chatId}`, { withCredentials: true });
        window.location.reload(); // Temporary solution - should use state management instead
      } catch (err) {
        console.error('Failed to delete chat:', err);
        alert('Failed to delete chat');
      }
    }
  };
  
  return (
    <aside className={"chat-sidebar " + (open ? 'open' : '')} aria-label="Previous chats">
      <div className="sidebar-header">
        <h2>Chats</h2>
        <button className="small-btn" onClick={onNewChat}>New</button>
      </div>
      <nav className="chat-list" aria-live="polite">
        {chats.map(c => (
          <div
            key={c._id}
            className={"chat-list-item " + (c._id === activeChatId ? 'active' : '')}
          >
            {editingChatId === c._id ? (
              <div className="chat-edit-container" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="chat-edit-input"
                  autoFocus
                />
                <button 
                  className="chat-edit-btn save"
                  onClick={e => handleSaveEdit(e, c._id)}
                >
                  ✓
                </button>
                <button 
                  className="chat-edit-btn cancel"
                  onClick={e => {
                    e.stopPropagation();
                    setEditingChatId(null);
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="chat-item-container" onClick={() => onSelectChat(c._id)}>
                <span className="title-line">{c.title}</span>
                <div className="chat-actions">
                  <button
                    className="chat-action-btn edit"
                    onClick={e => handleEditClick(e, c)}
                    aria-label="Edit chat title"
                  >
                    ✎
                  </button>
                  <button
                    className="chat-action-btn delete"
                    onClick={e => handleDelete(e, c._id)}
                    aria-label="Delete chat"
                  >
                    🗑
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {chats.length === 0 && <p className="empty-hint">No chats yet.</p>}
      </nav>
    </aside>
  );
};

export default ChatSidebar;
