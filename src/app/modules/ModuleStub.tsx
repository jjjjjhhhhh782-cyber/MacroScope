import { Card, PageLayout } from '../../shared/components'

interface ModuleStubProps {
  title: string
  subtitle: string
  phase: number
}

export default function ModuleStub({ title, subtitle, phase }: ModuleStubProps) {
  return (
    <PageLayout title={title} subtitle={subtitle}>
      <Card>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 14 }}>
          Module under construction. It arrives in Phase {phase}.
        </p>
      </Card>
    </PageLayout>
  )
}
