"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { campusPhotoSrc, campusPhotos, illustrativeGalleryAssets } from "@/data/campus-photos";

const galleryItems = [
  ...campusPhotos.map((photo) => ({ ...photo, src: campusPhotoSrc(photo.file), documentary: true })),
  ...illustrativeGalleryAssets.map((asset) => ({ ...asset, documentary: false })),
];

export function GalleryGrid() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);

  function open(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }

  const active = galleryItems[selected];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((photo, index) => (
          <figure key={photo.id} className={index === 0 || index === 4 ? "sm:col-span-2" : ""}>
            <button type="button" onClick={() => open(index)} className="photo-frame group block aspect-[4/3] w-full text-left sm:aspect-[16/10]" aria-label={`Expand image: ${photo.title}`}>
              <Image src={photo.src} alt={photo.description} fill sizes={index === 0 || index === 4 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} className={`${photo.documentary ? "object-cover" : "object-contain bg-[#f3f8f3] p-5"} transition-transform duration-200 motion-safe:group-hover:scale-[1.015]`} />
              <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Expand size={18} aria-hidden="true" /></span>
            </button>
            <figcaption className="border-b border-brand-charcoal/12 pb-5 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-brand-nero">{photo.category}</p>
              <h2 className="mt-2 text-xl">{photo.title}</h2>
              <p className="mt-2 text-base body-muted">{photo.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }} className="m-auto w-[min(1100px,calc(100vw-1.5rem))] max-w-none border-0 bg-brand-navy p-0 text-white shadow-2xl backdrop:bg-brand-navy/90" aria-label={active.title}>
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/85">{active.category} · {selected + 1} of {galleryItems.length}</p><h2 className="mt-1 text-base text-white sm:text-xl">{active.title}</h2></div>
          <button type="button" onClick={() => dialog.current?.close()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Close image"><X size={18} /></button>
        </div>
        <Image src={active.src} alt={active.description} width={3840} height={2160} sizes="(min-width: 1100px) 1100px, 100vw" className="max-h-[75vh] w-full object-contain" />
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <p className="max-w-2xl text-base leading-relaxed text-white/80">{active.description}</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => setSelected((selected - 1 + galleryItems.length) % galleryItems.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Previous image"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => setSelected((selected + 1) % galleryItems.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Next image"><ArrowRight size={17} /></button>
          </div>
        </div>
      </dialog>
    </>
  );
}
