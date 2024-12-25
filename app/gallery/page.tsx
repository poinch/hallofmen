import Image from 'next/image';
import { getGalleryItems } from '../../actions/gallery';

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className='min-h-screen bg-background'>
      <section className='relative bg-muted py-20'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h1 className='mb-6 text-4xl font-bold'>La Nostra Galleria</h1>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Scorri tra le nostre collezioni di tagli classici e stili
          </p>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {items.map((item) => (
              <div key={item.id} className='vintage-border group relative aspect-square'>
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className='rounded-lg object-cover transition-transform group-hover:scale-105'
                />
                <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100'>
                  <div className='p-4 text-center'>
                    <h3 className='mb-2 text-xl font-semibold text-white'>{item.title}</h3>
                    {item.description && <p className='text-white/80'>{item.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
