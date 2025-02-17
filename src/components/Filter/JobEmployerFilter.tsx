'use client'

import { useState, useEffect } from 'react'

interface Outlet {
  id: string
  name: string
  location: string
  logo: string
  isChecked: boolean
}

interface Employer {
  id: string
  name: string
  outlets?: Outlet[]
  isExpanded?: boolean
  isChecked: boolean
}

export default function JobEmployerFilter() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [employers, setEmployers] = useState<Employer[]>([
    {
      id: '1',
      name: 'RIGHT SERVICE PTE. LTD.',
      isChecked: false,
      outlets: [
        {
          id: 'mc1',
          name: "McDonald's",
          location: '(11/54, Anchorvale Link, Backer street)',
          logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FfsUXakqeRaKO3P5zY5lU8N5kspL6y.png',
          isChecked: false
        },
        {
          id: 'mc2',
          name: "McDonald's",
          location: '(113/54, Anchorvale Link, Backer street)',
          logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FfsUXakqeRaKO3P5zY5lU8N5kspL6y.png',
          isChecked: false
        },
        {
          id: 'kfc1',
          name: 'KFC',
          location: '(113/54, Anchorvale Link, Backer street)',
          logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FfsUXakqeRaKO3P5zY5lU8N5kspL6y.png',
          isChecked: false
        }
      ],
      isExpanded: false
    },
    {
      id: '2',
      name: 'RIGHT SERVICE PTE. LTD.',
      isChecked: false,
      isExpanded: false
    },
    {
      id: '3',
      name: 'RIGHT SERVICE PTE. LTD.',
      isChecked: false,
      isExpanded: false
    },
    {
      id: '4',
      name: 'RIGHT SERVICE PTE. LTD.',
      isChecked: false,
      isExpanded: false
    }
  ])

  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

  const toggleEmployer = (employerId: string) => {
    setEmployers(employers.map(emp => 
      emp.id === employerId 
        ? { ...emp, isExpanded: !emp.isExpanded }
        : emp
    ))
  }

  // Handle parent checkbox change
  const handleEmployerCheck = (employerId: string, checked: boolean) => {
    setEmployers(employers.map(emp => {
      if (emp.id === employerId) {
        return {
          ...emp,
          isChecked: checked,
          outlets: emp.outlets?.map(outlet => ({
            ...outlet,
            isChecked: checked
          }))
        }
      }
      return emp
    }))
  }

  // Handle child checkbox change
  const handleOutletCheck = (employerId: string, outletId: string, checked: boolean) => {
    setEmployers(employers.map(emp => {
      if (emp.id === employerId) {
        const updatedOutlets = emp.outlets?.map(outlet => 
          outlet.id === outletId ? { ...outlet, isChecked: checked } : outlet
        )
        const allOutletsChecked = updatedOutlets?.every(outlet => outlet.isChecked)
        return {
          ...emp,
          outlets: updatedOutlets,
          isChecked: allOutletsChecked || false
        }
      }
      return emp
    }))
  }

  // Filter employers based on search term and selected letter
  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLetter = selectedLetter 
      ? employer.name.charAt(0).toUpperCase() === selectedLetter
      : true
    return matchesSearch && matchesLetter
  })

  return (
    <div className="bg-white rounded-lg shadow-sm w-[300px]">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Employers</h2>
          <button className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search Employer"
              className="w-full px-4 py-2 border rounded-lg pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="h-[400px] overflow-y-auto relative">
            <div className="pr-8">
              {filteredEmployers.map((employer) => (
                <div key={employer.id} className="mb-2">
                  <div 
                    className="flex items-center gap-2 py-2"
                  >
                    <input 
                      type="checkbox" 
                      className="h-4 w-4"
                      checked={employer.isChecked}
                      onChange={(e) => handleEmployerCheck(employer.id, e.target.checked)}
                    />
                    <span 
                      className="text-sm cursor-pointer text-black"
                      onClick={() => toggleEmployer(employer.id)}
                    >
                      {employer.name}
                    </span>
                    {employer.outlets && (
                      <svg
                        className={`ml-auto h-4 w-4 transform transition-transform cursor-pointer ${
                          employer.isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        onClick={() => toggleEmployer(employer.id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  
                  {employer.outlets && employer.isExpanded && (
                    <div className="ml-6 space-y-2">
                      <div className="text-sm font-medium mb-1 text-black">Outlets</div>
                      {employer.outlets.map((outlet) => (
                        <div key={outlet.id} className="flex items-start gap-2">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 mt-1"
                            checked={outlet.isChecked}
                            onChange={(e) => handleOutletCheck(employer.id, outlet.id, e.target.checked)}
                          />
                          <div>
                            <div className="text-sm font-medium text-black">
                              {outlet.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {outlet.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Alphabet Index */}
            <div className="absolute right-0 top-0 flex flex-col items-center text-xs">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  className={`w-6 h-6 flex items-center justify-center hover:text-gray-600 ${
                    selectedLetter === letter 
                      ? 'text-blue-600 font-bold' 
                      : 'text-gray-400'
                  }`}
                  onClick={() => {
                    if (selectedLetter === letter) {
                      setSelectedLetter(null)
                    } else {
                      setSelectedLetter(letter)
                    }
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}