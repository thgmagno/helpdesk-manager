'use client'

import { actions } from '@/actions'
import { $Enums, UserRelation } from '@prisma/client'
import { FiTrash2, FiUser } from 'react-icons/fi'

interface Props {
  relation: UserRelation & {
    provider?: {
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }
    client?: {
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }
  }
  role: 'PROVIDER' | 'CLIENT'
}

export function RelationRow({ relation, role }: Props) {
  const relationsObject = {
    name: relation.provider?.name ?? relation.client?.name,
    email: relation.provider?.email ?? relation.client?.email,
  }

  const isPending =
    (role === 'PROVIDER' && !relation.clientAllow) ||
    (role === 'CLIENT' && !relation.providerAllow)

  return (
    <article
      key={relation.id}
      className="flex items-center rounded-lg border p-2 shadow"
    >
      <FiUser
        size={32}
        className="rounded-full bg-muted p-1 text-white ring-2"
      />

      <div className="ml-2 flex flex-1 flex-col text-sm">
        <h2 className="font-medium">{relationsObject.name}</h2>
        <p>{relationsObject.email}</p>
      </div>

      {role === 'CLIENT' && !relation.clientAllow && (
        <div className="flex flex-col overflow-hidden rounded-lg">
          <button
            onClick={() => actions.user.manageRequest(relation, true)}
            className="bg-success/90 px-2 py-0.5 text-sm text-white duration-300 hover:bg-success active:scale-95"
          >
            Aceitar
          </button>
          <button
            onClick={() => actions.user.manageRequest(relation, false)}
            className="bg-danger/90 px-2 py-0.5 text-sm text-white duration-300 hover:bg-danger active:scale-95"
          >
            Recusar
          </button>
        </div>
      )}

      {role === 'PROVIDER' && !relation.providerAllow && (
        <div className="flex flex-col overflow-hidden rounded-lg">
          <button
            onClick={() => actions.user.manageRequest(relation, true)}
            className="bg-success/90 px-2 py-0.5 text-sm text-white duration-300 hover:bg-success active:scale-95"
          >
            Aceitar
          </button>
          <button
            onClick={() => actions.user.manageRequest(relation, false)}
            className="bg-danger/90 px-2 py-0.5 text-sm text-white duration-300 hover:bg-danger active:scale-95"
          >
            Recusar
          </button>
        </div>
      )}

      {isPending && <p className="text-warning">pendente</p>}

      {relation.clientAllow && relation.providerAllow && (
        <FiTrash2
          onClick={() => actions.user.manageRequest(relation, false)}
          size={20}
          className="cursor-pointer text-danger"
        />
      )}
    </article>
  )
}
