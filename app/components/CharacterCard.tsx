'use client'

export default function CharacterCard({ data }: { data: any }) {
  return (
    <div className="w-64 h-40 bg-gray-800 rounded-lg p-4 relative flex flex-col justify-between border border-gray-500">
      <div>
        <div className="text-white font-bold text-lg">{data.name}</div>
        <div className="text-sm text-gray-300">NEX: {data.nex}</div>
        <div className="text-sm text-gray-400">Campanha: {data.campaign}</div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-full bg-white rounded-r-lg overflow-hidden">
        <img src={data.image} alt="Foto" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}
