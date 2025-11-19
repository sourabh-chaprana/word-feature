

// const detailFields = [
//   { id: 'company', label: 'Company', placeholder: 'Contoso Retail' },
//   { id: 'project', label: 'Project / Matter', placeholder: 'Northwind Migration' },
//   { id: 'role', label: 'Role / Title', placeholder: 'Engagement Lead' },
//   { id: 'email', label: 'Email', type: 'email', placeholder: 'client@contoso.com' },
//   { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-9876' },
// ]

// const InsertName = ({ formData, onFieldChange, onInsert, isInserting, status }) => {
//   const disabled = !formData.name.trim() || isInserting

//   return (
//     <section className="rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-md sm:p-8">
//       <form
//         className="flex flex-col gap-6"
//         onSubmit={(event) => {
//           event.preventDefault()
//           onInsert()
//         }}
//       >
//         <div>
//           <label htmlFor="name" className="text-sm font-semibold uppercase tracking-wide text-slate-600">
//             Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={formData.name}
//             onChange={(event) => onFieldChange('name', event.target.value)}
//             placeholder="Courtney Alvarez"
//             className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
//           />
//           <p className="mt-1 text-xs text-slate-500">This value is inserted at the end of the document.</p>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2">
//           {detailFields.map(({ id, label, placeholder, type = 'text' }) => (
//             <div key={id} className="flex flex-col">
//               <label htmlFor={id} className="text-sm font-medium text-slate-600">
//                 {label}
//               </label>
//               <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={(event) => onFieldChange(id, event.target.value)}
//                 placeholder={placeholder}
//                 className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
//               />
//             </div>
//           ))}
//         </div>

//         {status?.message && (
//           <div
//             className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
//               status.type === 'error'
//                 ? 'border-rose-200 bg-rose-50 text-rose-700'
//                 : 'border-emerald-200 bg-emerald-50 text-emerald-700'
//             }`}
//           >
//             {status.message}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={disabled}
//           className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:from-sky-600 hover:to-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {isInserting ? 'Inserting…' : 'Insert Into Word'}
//         </button>
//       </form>
//     </section>
//   )
// }

// export default InsertName


// src/components/InsertName.jsx
const detailFields = [
  { id: 'company', label: 'Company', placeholder: 'Contoso Retail' },
  { id: 'project', label: 'Project / Matter', placeholder: 'Northwind Migration' },
  { id: 'role', label: 'Role / Title', placeholder: 'Engagement Lead' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'client@contoso.com' },
  { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-9876' },
]

const InsertName = ({
  formData,
  onFieldChange,
  onInsert,
  isInserting,
  status,
  isWordAvailable,
  wordRuntimeChecked,
}) => {
  const disabled = !formData.name.trim() || isInserting
  const showWordWarning = wordRuntimeChecked && !isWordAvailable
  const showWordDetecting = !wordRuntimeChecked

  return (
    <section className="rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-md sm:p-8">
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onInsert()
        }}
      >
        <div>
          <label htmlFor="name" className="text-sm font-semibold uppercase tracking-wide text-slate-600">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            placeholder="Courtney Alvarez"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
          <p className="mt-1 text-xs text-slate-500">This value is inserted at the end of the document.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {detailFields.map(({ id, label, placeholder, type = 'text' }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-sm font-medium text-slate-600">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                value={formData[id]}
                onChange={(event) => onFieldChange(id, event.target.value)}
                placeholder={placeholder}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>
          ))}
        </div>

        {showWordDetecting && (
          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800">
            Checking for the Word add-in runtime…
          </div>
        )}

        {showWordWarning && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            Word add-in runtime not detected. Submitting will copy the Name field so you can paste it
            manually into your document.
          </div>
        )}

        {status?.message && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              status.type === 'error'
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:from-sky-600 hover:to-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isInserting ? 'Inserting…' : 'Insert Into Word'}
        </button>
      </form>
    </section>
  )
}

export default InsertName