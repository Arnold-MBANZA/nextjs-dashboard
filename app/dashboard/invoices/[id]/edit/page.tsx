import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>; // ✅ `params` est maintenant une promesse
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; // ✅ Attendre que `params` soit résolu
  console.log('ID from URL:', id); // Vérification de l'ID

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
