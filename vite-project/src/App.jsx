
/* global Word, Office */
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import InsertName from './components/InsertName'

// const API_BASE = 'https://localhost:3000'
// const INITIAL_FORM = { name: '', company: '', project: '', role: '', email: '', phone: '' }

// const App = () => {
//   const [formData, setFormData] = useState(INITIAL_FORM)
//   const [isInserting, setIsInserting] = useState(false)
//   const [status, setStatus] = useState({ type: null, message: '' })
//   const [isWordAvailable, setIsWordAvailable] = useState(false)
//   const [wordRuntimeChecked, setWordRuntimeChecked] = useState(false)
//   const [serverStatus, setServerStatus] = useState(null)

//   const heroStats = useMemo(
//     () => [
//       { label: 'Active briefs', value: 18 },
//       { label: 'Avg. turnaround', value: '6 min' },
//       { label: 'Errors avoided', value: '99%' },
//     ],
//     [],
//   )

//   useEffect(() => {
//     // const initOffice = async () => {
//     //   try {
//     //     if (typeof Office !== 'undefined' && typeof Office.onReady === 'function') {
//     //       await Office.onReady()
//     //     }
//     //     setIsWordAvailable(typeof Word !== 'undefined')
//     //   } catch (err) {
//     //     console.error('Office init error:', err)
//     //     setIsWordAvailable(false)
//     //   } finally {
//     //     setWordRuntimeChecked(true)
//     //   }
//     // }

//     const initOffice = async () => {
//       try {
//         if (typeof Office !== 'undefined' && typeof Office.onReady === 'function') {
//           const info = await Office.onReady()
//           const hostIsWord =
//             info?.host === Office.HostType.Word ||
//             Office.context?.host === Office.HostType.Word
    
//           setIsWordAvailable(hostIsWord && typeof Word !== 'undefined')
//         } else {
//           setIsWordAvailable(false)
//         }
//       } catch (err) {
//         console.error('Office init error:', err)
//         setIsWordAvailable(false)
//       } finally {
//         setWordRuntimeChecked(true)
//       }
//     }

//     const checkBackend = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/`)
//         const data = await response.json()
//         setServerStatus(data)
//       } catch (error) {
//         console.error('Backend unavailable:', error)
//         setServerStatus({ status: 'error', message: 'Backend unreachable' })
//       }
//     }

//     initOffice()
//     checkBackend()
//   }, [])

//   const handleFieldChange = useCallback((field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }, [])

//   const handleInsert = useCallback(async () => {
//     const trimmedName = formData.name.trim()

//     if (!trimmedName) {
//       setStatus({ type: 'error', message: 'Please enter a Name before inserting.' })
//       return
//     }

//     setIsInserting(true)
//     setStatus({ type: null, message: '' })
//  console.log('isWordAvailable', isWordAvailable)
//     if (isWordAvailable) {
//       try {
//         await Word.run(async (context) => {
//           context.document.body.insertParagraph(
//             `Name: ${trimmedName}`,
//             Word.InsertLocation.end,
//           )
//           await context.sync()
//         })
//         setStatus({
//           type: 'success',
//           message: `Inserted “Name: ${trimmedName}” into the active document.`,
//         })
//       } catch (error) {
//         setStatus({
//           type: 'error',
//           message: error?.message ?? 'Unable to insert content. Please try again.',
//         })
//       } finally {
//         setIsInserting(false)
//       }
//       return
//     }

//     try {
//       if (
//         typeof navigator !== 'undefined' &&
//         navigator.clipboard &&
//         typeof navigator.clipboard.writeText === 'function'
//       ) {
//         await navigator.clipboard.writeText(`Name: ${trimmedName}`)
//         setStatus({
//           type: 'success',
//           message: 'Word add-in not detected. Copied the “Name” value to your clipboard.',
//         })
//       } else {
//         throw new Error('Clipboard API unavailable')
//       }
//     } catch (clipboardError) {
//       console.error('Clipboard copy failed:', clipboardError)
//       setStatus({
//         type: 'error',
//         message: 'Word add-in not detected and clipboard copy failed. Please copy manually.',
//       })
//     } finally {
//       setIsInserting(false)
//     }
//   }, [formData.name, isWordAvailable])
  
//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
//       <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
//         <section className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-xl shadow-slate-200/60 sm:p-8">
//           <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Client intake</p>
//           <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Capture details & insert instantly</h1>
//               <p className="mt-2 max-w-2xl text-sm text-slate-600">
//                 Gather the information you need, validate it, and push it straight into Word.
//               </p>
//               {serverStatus && (
//                 <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
//                   Backend: {serverStatus.status === 'ok' ? 'ONLINE' : 'OFFLINE'}
//                 </p>
//               )}
//             </div>
//             <div className="grid grid-cols-3 gap-3 text-center">
//               {heroStats.map((stat) => (
//                 <div key={stat.label} className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold text-slate-800 shadow ring-1 ring-white/60">
//                   <div className="text-lg">{stat.value}</div>
//                   <p className="text-[11px] uppercase tracking-wide text-slate-500">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <InsertName
//           formData={formData}
//           onFieldChange={handleFieldChange}
//           onInsert={handleInsert}
//           isInserting={isInserting}
//           status={status}
//           isWordAvailable={isWordAvailable}
//           wordRuntimeChecked={wordRuntimeChecked}
//         />
//       </main>
//     </div>
//   )
// }

// export default App


/* global Word, Office */
import { useCallback, useEffect, useMemo, useState } from 'react'
import InsertName from './components/InsertName'

const API_BASE = 'https://localhost:3000'
const INITIAL_FORM = { name: '', company: '', project: '', role: '', email: '', phone: '' }

const App = () => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isInserting, setIsInserting] = useState(false)
  const [status, setStatus] = useState({ type: null, message: '' })
  const [isWordAvailable, setIsWordAvailable] = useState(false)
  const [wordRuntimeChecked, setWordRuntimeChecked] = useState(false)
  const [serverStatus, setServerStatus] = useState(null)

  const heroStats = useMemo(
    () => [
      { label: 'Active briefs', value: 18 },
      { label: 'Avg. turnaround', value: '6 min' },
      { label: 'Errors avoided', value: '99%' },
    ],
    [],
  )

  useEffect(() => {
    const resolveHost = (info) => {
      const fromInfo = info?.host
      const fromContext = Office?.context?.host
      const fromDiagnostics = Office?.context?.diagnostics?.host

      const normalized = (fromInfo ?? fromContext ?? fromDiagnostics ?? '').toString().toLowerCase()
      return normalized.includes('word')
    }

    const isWordApiSupported = () => {
      if (typeof Word !== 'undefined' && typeof Word.run === 'function') {
        return true
      }

      if (Office?.context?.requirements?.isSetSupported) {
        try {
          return Office.context.requirements.isSetSupported('WordApi', '1.1')
        } catch (error) {
          console.warn('Word API requirement check failed', error)
        }
      }

      return false
    }

    const initOffice = async () => {
      try {
        if (typeof Office !== 'undefined' && typeof Office.onReady === 'function') {
          const info = await Office.onReady()
          console.log('sourabh-----0', info)
          const hostIsWord = resolveHost(info)
          console.log('sourabh-----1', hostIsWord)
          setIsWordAvailable(hostIsWord && isWordApiSupported())
          console.log('sourabh-----2', hostIsWord && isWordApiSupported())
        } else {
          setIsWordAvailable(false)
        }
      } catch (err) {
        console.error('Office init error:', err)
        setIsWordAvailable(false)
      } finally {
        setWordRuntimeChecked(true)
      }
    }

    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_BASE}/`)
        const data = await response.json()
        setServerStatus(data)
      } catch (error) {
        console.error('Backend unavailable:', error)
        setServerStatus({ status: 'error', message: 'Backend unreachable' })
      }
    }

    initOffice()
    checkBackend()
  }, [])

  const handleFieldChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleInsert = useCallback(async () => {
    const trimmedName = formData.name.trim()

    if (!trimmedName) {
      setStatus({ type: 'error', message: 'Please enter a Name before inserting.' })
      return
    }

    setIsInserting(true)
    setStatus({ type: null, message: '' })

    if (isWordAvailable) {
      try {
        await Word.run(async (context) => {
          context.document.body.insertParagraph(`Name: ${trimmedName}`, Word.InsertLocation.end)
          await context.sync()
        })
        setStatus({
          type: 'success',
          message: `Inserted “Name: ${trimmedName}” into the active document.`,
        })
      } catch (error) {
        setStatus({
          type: 'error',
          message: error?.message ?? 'Unable to insert content. Please try again.',
        })
      } finally {
        setIsInserting(false)
      }
      return
    }

    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        await navigator.clipboard.writeText(`Name: ${trimmedName}`)
        setStatus({
          type: 'success',
          message: 'Word add-in not detected. Copied the “Name” value to your clipboard.',
        })
      } else {
        throw new Error('Clipboard API unavailable')
      }
    } catch (clipboardError) {
      console.error('Clipboard copy failed:', clipboardError)
      setStatus({
        type: 'error',
        message: 'Word add-in not detected and clipboard copy failed. Please copy manually.',
      })
    } finally {
      setIsInserting(false)
    }
  }, [formData.name, isWordAvailable])

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Client intake</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Capture details & insert instantly</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Gather the information you need, validate it, and push it straight into Word.
              </p>
              {serverStatus && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Backend: {serverStatus.status === 'ok' ? 'ONLINE' : 'OFFLINE'}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold text-slate-800 shadow ring-1 ring-white/60">
                  <div className="text-lg">{stat.value}</div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InsertName
          formData={formData}
          onFieldChange={handleFieldChange}
          onInsert={handleInsert}
          isInserting={isInserting}
          status={status}
          isWordAvailable={isWordAvailable}
          wordRuntimeChecked={wordRuntimeChecked}
        />
      </main>
    </div>
  )
}

export default App