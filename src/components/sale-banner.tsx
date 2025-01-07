import { Button } from '@/components/ui/button'

export function SaleBanner() {
  return (
    <div className="relative h-[200px] md:h-[400px] bg-red-600">
      <img
        src="https://www.soch.com/media/wysiwyg/Main-Strip-Banner_desktop-min_7.jpg"
        alt="Red Dot Sale"
        className=""
      />
      <div className="absolute inset-0 flex items-center justify-end p-8">
        <div className="text-right">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            RED DOT SALE
          </h2>
          <p className="text-xl md:text-3xl text-white mb-6">
            Upto 50% off
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-red-600 hover:bg-white/90"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
  )
}

