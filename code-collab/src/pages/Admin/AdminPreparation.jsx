import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { LoadingSpinner } from '../../components/Admin/Common/LoadingSpinner';
import { SearchBar } from '../../components/Admin/Common/SearchBar';
import { Pagination } from '../../components/Admin/Common/Pagination';
import { ConfirmationModal } from '../../components/Admin/Common/ConfirmationModal';

const AdminPreparation = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'dsa',
    content: '',
    difficulty: 'medium',
    status: 'published',
  });
  const itemsPerPage = 10;

  // Load preparation content
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockContent = [
        { _id: '1', title: 'Array Basics', category: 'dsa', difficulty: 'easy', status: 'published', createdAt: '2024-01-15' },
        { _id: '2', title: 'Binary Search Trees', category: 'dsa', difficulty: 'medium', status: 'published', createdAt: '2024-01-14' },
        { _id: '3', title: 'System Design Patterns', category: 'interview', difficulty: 'hard', status: 'published', createdAt: '2024-01-13' },
        { _id: '4', title: 'Time Complexity Analysis', category: 'dsa', difficulty: 'medium', status: 'draft', createdAt: '2024-01-12' },
        { _id: '5', title: 'Behavioral Questions', category: 'interview', difficulty: 'easy', status: 'published', createdAt: '2024-01-11' },
      ];
      setContent(mockContent);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddContent = () => {
    setFormData({ title: '', category: 'dsa', content: '', difficulty: 'medium', status: 'published' });
    setShowAddForm(true);
  };

  const handleEditContent = (item) => {
    setSelectedContent(item);
    setFormData(item);
    setShowAddForm(true);
  };

  const handleSaveContent = () => {
    if (selectedContent) {
      setContent(
        content.map((c) => (c._id === selectedContent._id ? { ...selectedContent, ...formData } : c))
      );
    } else {
      const newContent = {
        _id: String(content.length + 1),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setContent([...content, newContent]);
    }
    setShowAddForm(false);
    setSelectedContent(null);
  };

  const handleDeleteContent = (item) => {
    setSelectedContent(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setContent(content.filter((c) => c._id !== selectedContent._id));
    setShowModal(false);
    setSelectedContent(null);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'dsa':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'aptitude':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="lg" text="Loading Preparation Content..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Preparation Management</h1>
            <p className="text-gray-600 mt-1">Manage DSA, Interview, and Aptitude content</p>
          </div>
          <button
            onClick={handleAddContent}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          >
            + Add New Content
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search by title or category..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Content Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContent.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(item.difficulty)}`}>
                      {item.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.createdAt}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditContent(item)}
                        className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteContent(item)}
                        className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredContent.length / itemsPerPage)}
          totalItems={filteredContent.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Add/Edit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {selectedContent ? 'Edit Content' : 'Add New Content'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter content title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="dsa">DSA</option>
                      <option value="interview">Interview</option>
                      <option value="aptitude">Aptitude</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter content (supports markdown)"
                    rows="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedContent(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContent}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save Content
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showModal}
          title="Delete Content"
          message={`Are you sure you want to delete "${selectedContent?.title}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          isDanger={true}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPreparation;
