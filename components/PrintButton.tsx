'use client'

export default function PrintButton() {
  return (
    <div className="text-center mt-8 print:hidden">
      <button
        onClick={() => window.print()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        📄 Imprimer / Enregistrer en PDF
      </button>
      <p className="text-sm text-gray-600 mt-2">
        Utilisez Ctrl+P ou Cmd+P puis "Enregistrer au format PDF"
      </p>
    </div>
  )
}
