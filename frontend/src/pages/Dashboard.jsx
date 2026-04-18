import React, { useState, useEffect, useMemo } from 'react';
import { 
  ClipboardList, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  // Extended dataset for pagination
  const allReviews = [
    { id: '#INV-8821', title: 'Annual Strategy Forum 2024', dept: 'Operations', date: 'Oct 12, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8794', title: 'Q4 Shareholder Briefing', dept: 'Finance', date: 'Oct 10, 2023', status: 'Under Review', statusColor: 'blue' },
    { id: '#INV-8752', title: 'New Policy Orientation', dept: 'Legal', date: 'Oct 08, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8710', title: 'Marketing Campaign Launch', dept: 'Marketing', date: 'Oct 05, 2023', status: 'Needs Revision', statusColor: 'red' },
    { id: '#INV-8692', title: 'Supply Chain Audit 2023', dept: 'Operations', date: 'Oct 01, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8691', title: 'Q3 Financial Review', dept: 'Finance', date: 'Sep 28, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8688', title: 'Campus Security Update', dept: 'Administration', date: 'Sep 25, 2023', status: 'Under Review', statusColor: 'blue' },
    { id: '#INV-8685', title: 'IT Infrastructure Upgrade', dept: 'IT Services', date: 'Sep 22, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8680', title: 'Staff Training Seminar', dept: 'HR', date: 'Sep 20, 2023', status: 'Needs Revision', statusColor: 'red' },
    { id: '#INV-8675', title: 'Library Resource Expansion', dept: 'Library', date: 'Sep 18, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8672', title: 'Laboratory Equipment Procurement', dept: 'Science R&D', date: 'Sep 15, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8668', title: 'Student Welfare Program', dept: 'Student Affairs', date: 'Sep 12, 2023', status: 'Under Review', statusColor: 'blue' }
  ];

  // Derived stat counts from the dataset
  const pendingCount = allReviews.filter(r => r.status === 'Pending Review').length;
  const activeCount  = allReviews.filter(r => r.status === 'Under Review').length;
  const alertCount   = allReviews.filter(r => r.status === 'Needs Revision').length;
  const approvedCount = allReviews.filter(r => r.status === 'Approved').length;
  const approvalRate = allReviews.length > 0
    ? Math.round((approvedCount / allReviews.length) * 100)
    : 0;

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive dropdown options automatically from data
  const departments = ['All Departments', ...new Set(allReviews.map(r => r.dept))];
  const statuses = ['All Statuses', ...new Set(allReviews.map(r => r.status))];

  // Filtering Logic
  const filteredReviews = useMemo(() => {
    return allReviews.filter(review => {
      const matchSearch = searchQuery === '' || 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        review.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.dept.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchDept = selectedDepartment === 'All Departments' || review.dept === selectedDepartment;
      const matchStatus = selectedStatus === 'All Statuses' || review.status === selectedStatus;

      return matchSearch && matchDept && matchStatus;
    });
  }, [searchQuery, selectedDepartment, selectedStatus, allReviews]);

  // Reset to page 1 whenever a filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment, selectedStatus]);

  // Derived Pagination
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredReviews.length);
  const currentReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getStatusBadge = (statusColor, text) => {
    switch(statusColor) {
      case 'yellow': return <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-1.5"></span>{text}</span>;
      case 'blue': return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>{text}</span>;
      case 'green': return <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>{text}</span>;
      case 'red': return <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>{text}</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Department Oversight</h1>
        <p className="text-gray-500 mt-1 text-sm font-medium">Manage department reviews, templates, and administrative alerts.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl">
              <ClipboardList size={20} />
            </div>
            <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 inline-block"></span>
              +3 today
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Pending Reviews</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{pendingCount}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
              <FileText size={20} />
            </div>
            <div className="bg-gray-50 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full">
              85% usage
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Active Templates</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{activeCount}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-yellow-50 text-yellow-500 rounded-xl">
              <AlertCircle size={20} />
            </div>
            <div className="bg-yellow-50 text-yellow-600 text-[10px] font-bold px-2 py-1 rounded-full">
              High Priority
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Admin Alerts</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{alertCount}</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-green-50 text-green-500 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full">
              +2% trend
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Approval Rate %</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{approvalRate}%</h3>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                <CheckCircle2 size={14} />
              </div>
              <span className="text-xs font-medium text-gray-500">{approvedCount} approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invitations by title, ID, or department..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3">
             <div className="flex bg-white border border-gray-200 rounded-lg divide-x divide-gray-200 text-sm overflow-hidden text-gray-700 font-medium">
                <div className="relative w-40 text-left hover:bg-gray-50 flex items-center h-full group">
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full appearance-none bg-transparent hover:cursor-pointer outline-none focus:outline-none px-4 py-2 pr-8 truncate h-full z-10"
                  >
                    {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none z-0">
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>

                <div className="relative w-36 text-left hover:bg-gray-50 flex items-center h-full group">
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full appearance-none bg-transparent hover:cursor-pointer outline-none focus:outline-none px-4 py-2 pr-8 truncate h-full z-10"
                  >
                    {statuses.map((s, i) => <option key={i} value={s}>{s}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none z-0">
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>
             </div>
             <button className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
               <SlidersHorizontal size={18} />
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#fcfdfd] text-xs uppercase font-bold text-gray-400 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg tracking-wider">ID</th>
                <th className="px-6 py-4 tracking-wider">Invitation Title</th>
                <th className="px-6 py-4 tracking-wider">Department</th>
                <th className="px-6 py-4 tracking-wider">Date Created</th>
                <th className="px-6 py-4 tracking-wider">Status</th>
                <th className="px-6 py-4 rounded-tr-lg tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentReviews.length > 0 ? (
                currentReviews.map((review, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 font-medium text-gray-400">{review.id}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{review.title}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{review.dept}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{review.date}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(review.statusColor, review.status)}
                    </td>
                    <td className="px-6 py-4 font-bold text-orange-500 flex items-center space-x-1 group-hover:text-orange-600">
                      <span>Preview</span>
                      <ArrowRight size={14} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No reviews found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <div className="text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredReviews.length === 0 ? 0 : startIndex + 1}</span> to <span className="font-bold text-gray-900">{endIndex}</span> of <span className="font-bold text-gray-900">{filteredReviews.length}</span> reviews
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-200 rounded-lg font-medium transition-colors ${currentPage === 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-200 rounded-lg font-medium transition-colors ${currentPage === totalPages ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-50 bg-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
