
// src/app/kapal/page.tsx
import { Ship, Users, Calendar, Settings } from 'lucide-react'
import Card from '@/src/component/ui/card'
import Table from '@/src/component/ui/table'
import Button from '@/src/component/ui/button'
import kapalData from '@/src/data/kapal.json'
import { getAbkByKapalId } from '@/src/utils/dataHelpers'

export default function KapalPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kapal</h1>
          <p className="text-gray-600">Kelola data kapal dan status operasional</p>
        </div>
        <Button>
          <Ship className="h-4 w-4 mr-2" />
          Tambah Kapal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-full">
              <Ship className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Kapal</p>
              <p className="text-2xl font-bold text-blue-600">{kapalData.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-full">
              <Ship className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kapal Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {kapalData.filter(k => k.status === 'aktif').length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-500 rounded-full">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-orange-600">
                {kapalData.filter(k => k.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Kapal</h3>
        <Table headers={['Nama Kapal', 'No. Registrasi', 'Kapasitas', 'Status', 'Tahun', 'ABK', 'Aksi']}>
          {kapalData.map((kapal) => {
            const abkCount = getAbkByKapalId(kapal.id).length
            return (
              <tr key={kapal.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Ship className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{kapal.nama}</div>
                      <div className="text-sm text-gray-500">{kapal.jenis}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {kapal.nomor_registrasi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {kapal.kapasitas} ton
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    kapal.status === 'aktif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {kapal.status === 'aktif' ? 'Aktif' : 'Maintenance'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {kapal.tahun_buat}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Users className="h-4 w-4 mr-1" />
                    {abkCount} orang
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="secondary" size="sm" className="mr-2">
                    Detail
                  </Button>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            )
          })}
        </Table>
      </Card>
    </div>
  )
}