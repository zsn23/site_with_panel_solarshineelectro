"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { adminUsers } from "@/lib/admin-data"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState([...adminUsers])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddUser = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
    }

    setUsers((prev) => [...prev, newUser])
    setIsAddDialogOpen(false)

    toast({
      title: "Admin user added",
      description: "The new admin user has been added successfully",
    })
  }

  const handleEditUser = (userData) => {
    setUsers((prev) => prev.map((user) => (user.id === userToEdit.id ? { ...user, ...userData } : user)))

    setIsEditDialogOpen(false)
    setUserToEdit(null)

    toast({
      title: "Admin user updated",
      description: "The admin user has been updated successfully",
    })
  }

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id))
    setUserToDelete(null)

    toast({
      title: "Admin user deleted",
      description: "The admin user has been deleted successfully",
    })
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold dark:text-gray-900">Settings</h1>
      </div>

      {/* <Card> */}
      {/* <CardHeader> */}
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl dark:text-gray-900">Admin Users</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Add Admin User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UserForm onSubmit={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>
      {/* </CardHeader> */}
      {/* <CardContent> */}
      <div className="border rounded-lg border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="bg-muted/50 dark:bg-gray-800 text-foreground">
                <TableHead className="text-foreground font-bold">Name</TableHead>
                <TableHead className="text-center text-foreground font-bold">Email</TableHead>
                <TableHead className="text-center text-foreground font-bold">Password</TableHead>
                <TableHead className="text-center text-foreground font-bold">Role</TableHead>
                <TableHead className="text-center text-foreground font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="dark:text-gray-900">
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    <div>
                      {user.name}
                      <div className=" text-xs text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">{user.email}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">{user.password}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    <Badge
                      className={user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Dialog
                        open={isEditDialogOpen && userToEdit?.id === user.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (!open) setUserToEdit(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setUserToEdit(user)} className="dark:text-gray-100">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <UserForm user={userToEdit} onSubmit={handleEditUser} />
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900"
                            onClick={() => setUserToDelete(user)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the admin user "{userToDelete?.name}". This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteUser}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  )
}

function UserForm({ user, onSubmit }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "admin",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{user ? "Edit Admin User" : "Add Admin User"}</DialogTitle>
        <DialogDescription>
          {user ? "Update the details for this admin user." : "Add a new admin user to manage the system."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{user ? "New Password (leave blank to keep current)" : "Password"}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        <DialogFooter>
          <Button type="submit">{user ? "Update User" : "Add User"}</Button>
        </DialogFooter>
      </form>
    </>
  )
}

