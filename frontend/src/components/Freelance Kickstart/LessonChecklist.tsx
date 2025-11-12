import React, { useState, useEffect } from 'react';
import '../../styles/Freelance Kickstart/LessonChecklist.css';

interface ChecklistItem {
  text: string;
  completed?: boolean;
}

interface LessonChecklistProps {
  day: number;
  learningOutcomes: string[];
  checklistItems: ChecklistItem[];
}

const LessonChecklist: React.FC<LessonChecklistProps> = ({ 
  day,
  learningOutcomes, 
  checklistItems 
}) => {
  // Create a unique key for this lesson's checklist state
  const storageKey = `freelance-kickstart-checklist-day-${day}`;

  // Load saved state for this specific lesson
  const loadSavedState = (dayNumber: number, items: ChecklistItem[]): ChecklistItem[] => {
    const key = `freelance-kickstart-checklist-day-${dayNumber}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const savedItems = JSON.parse(saved);
        // Map saved completion state to current checklist items
        return items.map((item, index) => ({
          text: item.text,
          completed: savedItems[index]?.completed === true
        }));
      }
    } catch (error) {
      console.error('Error loading checklist state:', error);
    }
    // Return fresh items with no completed state
    return items.map(item => ({ text: item.text, completed: false }));
  };

  const [items, setItems] = useState<ChecklistItem[]>(() => 
    loadSavedState(day, checklistItems)
  );

  // Reload state when day changes (navigating to different lesson)
  useEffect(() => {
    const newState = loadSavedState(day, checklistItems);
    setItems(newState);
  }, [day, checklistItems]); // Reload when day or checklistItems change

  // Save state to localStorage whenever items change
  useEffect(() => {
    try {
      const stateToSave = items.map(item => ({ completed: item.completed || false }));
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving checklist state:', error);
    }
  }, [items, storageKey]);

  const toggleItem = (index: number) => {
    setItems(prevItems => 
      prevItems.map((item, i) => 
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="lesson-checklist">
      <div className="checklist-header">
        <h3 className="checklist-title">📋 Your Daily Checklist</h3>
        <div className="checklist-progress">
          <span className="progress-text">
            {completedCount} of {totalCount} completed
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              data-progress={Math.round(progressPercentage)}
            />
          </div>
        </div>
      </div>

      <div className="checklist-content">
        <div className="learning-outcomes-section">
          <h4 className="section-title">🎯 Learning Outcomes</h4>
          <ul className="outcomes-list">
            {learningOutcomes.map((outcome, index) => (
              <li key={index} className="outcome-item">{outcome}</li>
            ))}
          </ul>
        </div>

        <div className="action-checklist-section">
          <h4 className="section-title">✅ Action Checklist</h4>
          <div className="checklist-items">
            {items.map((item, index) => (
              <label 
                key={index} 
                className={`checklist-item ${item.completed ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={item.completed || false}
                  onChange={() => toggleItem(index)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="item-text">{item.text}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonChecklist;

