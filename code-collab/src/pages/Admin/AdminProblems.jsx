import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { LoadingSpinner } from '../../components/Admin/Common/LoadingSpinner';
import { SearchBar } from '../../components/Admin/Common/SearchBar';
import { Pagination } from '../../components/Admin/Common/Pagination';
import { ConfirmationModal } from '../../components/Admin/Common/ConfirmationModal';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminProblems = () => {
  const { theme } = useTheme();
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'medium',
    category: '',
    status: 'published',
  });
  const itemsPerPage = 10;

  // Load problems
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockProblems = [
        { _id: '1', title: 'Two Sum', difficulty: 'easy', category: 'Array', status: 'published', createdAt: '2024-01-15' },
        { _id: '2', title: 'Longest Substring', difficulty: 'medium', category: 'String', status: 'published', createdAt: '2024-01-14' },
        { _id: '3', title: 'Merge k Lists', difficulty: 'hard', category: 'Linked List', status: 'published', createdAt: '2024-01-13' },
        { _id: '4', title: 'Binary Tree Level Order', difficulty: 'medium', category: 'Tree', status: 'draft', createdAt: '2024-01-12' },
        { _id: '5', title: 'LRU Cache', difficulty: 'hard', category: 'Design', status: 'published', createdAt: '2024-01-11' },
      ];
      setProblems(mockProblems);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProblems = problems.filter(
    (problem) =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProblem = () => {
    setFormData({ title: '', description: '', difficulty: 'medium', category: '', status: 'published' });
    setShowAddForm(true);
  };

  const handleEditProblem = (problem) => {
    setSelectedProblem(problem);
    setFormData(problem);
    setShowAddForm(true);
  };

  const handleSaveProblem = () => {
    if (selectedProblem) {
      setProblems(
        problems.map((p) => (p._id === selectedProblem._id ? { ...selectedProblem, ...formData } : p))
      );
    } else {
      const newProblem = {
        _id: String(problems.length + 1),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProblems([...problems, newProblem]);
    }
    setShowAddForm(false);
    setSelectedProblem(null);
  };

  const handleDeleteProblem = (problem) => {
    setSelectedProblem(problem);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setProblems(problems.filter((p) => p._id !== selectedProblem._id));
    setShowModal(false);
    setSelectedProblem(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return { bg: 'bg-green-500 bg-opacity-10', text: 'text-green-600', label: 'Easy' };
      case 'medium':
        return { bg: 'bg-yellow-500 bg-opacity-10', text: 'text-yellow-600', label: 'Medium' };
      case 'hard':
        return { bg: 'bg-red-500 bg-opacity-10', text: 'text-red-600', label: 'Hard' };
      default:
        return { bg: 'bg-gray-500 bg-opacity-10', text: 'text-gray-600', label: 'Unknown' };
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return { bg: 'bg-green-500 bg-opacity-10', text: 'text-green-600' };
      case 'draft':
        return { bg: 'bg-blue-500 bg-opacity-10', text: 'text-blue-600' };
      default:
        return { bg: 'bg-gray-500 bg-opacity-10', text: 'text-gray-600' };
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="lg" text="Loading Problems..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text.primary}`}>
              Problem Management
            </h1>
            <p className={`${theme.text.secondary} mt-2 text-sm`}>
              Manage coding problems and test cases
            </p>
          </div>
          <button
            onClick={handleAddProblem}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${theme.button.primary} shadow-lg hover:shadow-xl`}
          >
            <Plus size={20} />
            Add Problem
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search by problem title or category..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Problems Table */}
        <div className={`${theme.bg.secondary} rounded-xl shadow-lg overflow-hidden border ${theme.border.primary}`}>
          <table className="w-full">
            <thead className={`${theme.bg.tertiary} border-b ${theme.border.primary}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${theme.text.primary}`}>Title</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${theme.text.primary}`}>Category</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${theme.text.primary}`}>Difficulty</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${theme.text.primary}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${theme.text.primary}`}>Created</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${theme.text.primary}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem, index) => (
                  <tr
                    key={problem._id}
                    className={`border-b ${theme.border.primary} ${index % 2 === 0 ? theme.bg.primary : theme.bg.secondary} hover:${theme.bg.tertiary} transition-colors duration-150`}
                  >
                    <td className={`px-6 py-4 text-sm font-medium ${theme.text.primary}`}>
                      {problem.title}
                    </td>
                    <td className={`px-6 py-4 text-sm ${theme.text.secondary}`}>
                      {problem.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {(() => {
                        const colors = getDifficultyColor(problem.difficulty);
                        return (
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${colors.bg} ${colors.text}`}>
                            {colors.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {(() => {
                        const colors = getStatusColor(problem.status);
                        return (
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${colors.bg} ${colors.text}`}>
                            {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                          </span>
                        );
                      })()}
                    </td>
                    <td className={`px-6 py-4 text-sm ${theme.text.secondary}`}>
                      {problem.createdAt}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditProblem(problem)}
                          className={`p-2 rounded-lg transition-all duration-200 ${theme.bg.tertiary} hover:bg-blue-500 hover:bg-opacity-20 ${theme.text.accent}`}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProblem(problem)}
                          className={`p-2 rounded-lg transition-all duration-200 ${theme.bg.tertiary} hover:bg-red-500 hover:bg-opacity-20 text-red-600`}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={`px-6 py-8 text-center ${theme.text.secondary}`}>
                    No problems found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProblems.length / itemsPerPage)}
          totalItems={filteredProblems.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Add/Edit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {selectedProblem ? 'Edit Problem' : 'Add New Problem'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter problem title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter problem description"
                    rows="4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Array, String, Tree"
                    />
                  </div>
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
                    setSelectedProblem(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProblem}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save Problem
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showModal}
          title="Delete Problem"
          message={`Are you sure you want to delete "${selectedProblem?.title}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          isDanger={true}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProblems;
