import React from 'react'
import { useState } from 'react'
import './App.css'

// Helper to get start of week (Monday)
function getStartOfWeek(date) {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is Sunday
    return new Date(d.setDate(diff))
}

// Helper to get array of 7 days for a week
function getWeekDays(startDate) {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startDate)
        d.setDate(d.getDate() + i)
        return d
    })
}

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function Agenda() {
    const [weekOffset, setWeekOffset] = useState(0)
    const [plans, setPlans] = useState({}) // { 'YYYY-MM-DD': 'plan text' }
    const [editing, setEditing] = useState({ date: null, value: '' })

    // Calculate current week start
    const today = new Date()
    const startOfWeek = getStartOfWeek(new Date(today.getFullYear(), today.getMonth(), today.getDate() + weekOffset * 7))
    const weekDays = getWeekDays(startOfWeek)

    // Format date as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().slice(0, 10)

    // Handle day click
    const handleDayClick = (date) => {
        const key = formatDate(date)
        setEditing({ date: key, value: plans[key] || '' })
    }

    // Handle plan save
    const handleSave = () => {
        setPlans({ ...plans, [editing.date]: editing.value })
        setEditing({ date: null, value: '' })
    }

    // Handle input change
    const handleChange = (e) => {
        setEditing({ ...editing, value: e.target.value })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">Skool ajenda</h1>
            <div className="grid grid-cols-7 gap-4 w-full max-w-4xl mb-4">
                {weekDays.map((date, idx) => {
                    const key = formatDate(date)
                    const isEditing = editing.date === key
                    return (
                        <div
                            key={key}
                            className="bg-white rounded-lg shadow p-3 flex flex-col items-center cursor-pointer hover:bg-blue-50 min-h-[120px] relative"
                            onClick={() => handleDayClick(date)}
                        >
                            <div className="font-semibold text-blue-700">{dayNames[idx]}</div>
                            <div className="text-xs text-gray-500 mb-2">{date.getDate()}-{date.getMonth() + 1}</div>
                            {isEditing ? (
                                <div className="w-full">
                                    <input
                                        className="border rounded p-1 w-full mb-1"
                                        value={editing.value}
                                        onChange={handleChange}
                                        autoFocus
                                        onClick={e => e.stopPropagation()}
                                        onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
                                    />
                                    <button
                                        className="bg-blue-500  px-2 py-1 rounded text-xs mr-1"
                                        onClick={e => { e.stopPropagation(); handleSave() }}
                                    >Save</button>
                                    <button
                                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs"
                                        onClick={e => { e.stopPropagation(); setEditing({ date: null, value: '' }) }}
                                    >Cancel</button>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-800 w-full min-h-[40px] break-words">
                                    {plans[key] ? plans[key] : <span className="text-gray-300">Click to add</span>}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="flex gap-8 mt-6 items-center">
                <button
                    className="flex items-center gap-2 bg-white text-blue-600 border border-blue-500 px-6 py-3 rounded-full shadow-md text-lg font-semibold transition hover:bg-blue-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => setWeekOffset(weekOffset - 1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Previous
                </button>
                <button
                    className="flex items-center gap-2 bg-white text-blue-600 border border-blue-500 px-6 py-3 rounded-full shadow-md text-lg font-semibold transition hover:bg-blue-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => setWeekOffset(weekOffset + 1)}
                >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Agenda