export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Last updated 10/31/2025, data updated last day of month
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
