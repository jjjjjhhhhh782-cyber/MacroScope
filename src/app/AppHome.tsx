import { Button, Card, Input, PageLayout, Table } from '../shared/components'
import type { TableColumn } from '../shared/components'

interface SampleRow {
  country: string
  gdpGrowth: string
  inflation: string
}

const sampleColumns: TableColumn<SampleRow>[] = [
  { key: 'country', header: 'Country', render: (row) => row.country },
  { key: 'gdpGrowth', header: 'GDP growth', render: (row) => row.gdpGrowth, align: 'right' },
  { key: 'inflation', header: 'Inflation', render: (row) => row.inflation, align: 'right' },
]

const sampleRows: SampleRow[] = [
  { country: 'Kazakhstan', gdpGrowth: '5.1%', inflation: '8.5%' },
  { country: 'Germany', gdpGrowth: '0.3%', inflation: '2.4%' },
  { country: 'United States', gdpGrowth: '2.8%', inflation: '3.0%' },
]

export default function AppHome() {
  return (
    <PageLayout
      title="Component preview"
      subtitle="Temporary page. The dashboard arrives in Phase 6."
      actions={<Button variant="accent">Accent action</Button>}
    >
      <Card title="Buttons">
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>
      <Card title="Inputs">
        <div style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 360 }}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" error="Password is too short" />
        </div>
      </Card>
      <Card title="Table">
        <Table columns={sampleColumns} rows={sampleRows} rowKey={(row) => row.country} />
      </Card>
    </PageLayout>
  )
}
