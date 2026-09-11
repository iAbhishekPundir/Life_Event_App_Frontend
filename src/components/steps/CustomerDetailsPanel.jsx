import IconAvatar from '../common/IconAvatar'

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</span>
      <span className="font-semibold text-brand">{value}</span>
    </div>
  )
}

export default function CustomerDetailsPanel({ client, event }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        <div className="flex shrink-0 items-center gap-3">
          <IconAvatar initials={client.initials} size="md" />
          <div>
            <p className="text-base font-semibold text-brand">{client.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-full border border-hairline bg-white px-2 py-0.5 text-[10px] font-semibold uppercase text-ink-muted">
                {client.segment}
              </span>
              <span className="text-xs text-ink-muted">{client.maritalStatus}</span>
            </div>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          <Field label="Age" value={client.age} />
          <Field label="Customer ID" value={event.customerId} />
          <Field label="Portfolio" value={client.portfolio} />
          <Field label="Risk" value={client.risk} />
          <Field label="Last Review" value={client.lastReview} />
          <Field label="Account Type" value={client.accountType} />
          <Field label="Account Number" value={client.accountNumber} />
          <Field label="Sort Code" value={client.sortCode} />
          <Field label="Balance" value={client.balance} />
          <Field label="Source" value={event.eventSource} />
        </div>
      </div>
    </div>
  )
}
