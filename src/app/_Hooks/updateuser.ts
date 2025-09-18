import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { User } from '../interfaces/IUser'

type UpdateUserInput = {
  id: number
  data: Partial<User>
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserInput) => {
      const res = await axios.put(`http://localhost:3000/api/users/${id}`, data)
      return res.data as User
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
