import { Form, Head, router } from '@inertiajs/react';
import { PencilLine, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import students from '@/routes/students';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    program: string;
    gender: string;
    birthday: string;
    year_level: number;
    age: number;
};

export default function StudentsIndex({ students: studentRecords }: { students: Student[] }) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    return (
        <>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Student platform</p>
                        <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage the students in your school.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden rounded-lg border bg-card p-3 sm:block">
                            <Users className="size-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus />
                                    Add student
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Add student</DialogTitle>
                                    <DialogDescription>Enter the student details below.</DialogDescription>
                                </DialogHeader>
                                <Form
                                    {...students.add.form()}
                                    resetOnSuccess
                                    onSuccess={() => setIsAddDialogOpen(false)}
                                    className="grid gap-4 sm:grid-cols-2"
                                >
                                    {({ errors, processing }) => (
                                        <>
                                            <StudentField label="First name" name="first_name" error={errors.first_name} />
                                            <StudentField label="Last name" name="last_name" error={errors.last_name} />
                                            <StudentField label="Email" name="email" type="email" error={errors.email} />
                                            <StudentField label="Birthday" name="birthday" type="date" error={errors.birthday} />
                                            <StudentField label="Program" name="program" placeholder="e.g. BSIT" error={errors.program} />
                                            <StudentField label="Gender" name="gender" placeholder="e.g. Female" error={errors.gender} />
                                            <StudentField
                                                label="Year level"
                                                name="year_level"
                                                type="number"
                                                min={1}
                                                max={4}
                                                error={errors.year_level}
                                            />
                                            <DialogFooter className="sm:col-span-2">
                                                <Button type="submit" disabled={processing}>
                                                    {processing ? 'Adding...' : 'Add student'}
                                                </Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="border-b px-5 py-4">
                        <p className="font-medium">All students</p>
                        <p className="text-sm text-muted-foreground">
                            {studentRecords.length} {studentRecords.length === 1 ? 'student' : 'students'}
                        </p>
                    </div>

                    {studentRecords.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            No students have been added yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[720px] text-left text-sm">
                                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Name</th>
                                        <th className="px-5 py-3 font-medium">Email</th>
                                        <th className="px-5 py-3 font-medium">Program</th>
                                        <th className="px-5 py-3 font-medium">Year level</th>
                                        <th className="px-5 py-3 font-medium">Age</th>
                                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {studentRecords.map((student) => (
                                        <tr key={student.id} className="transition-colors hover:bg-muted/30">
                                            <td className="whitespace-nowrap px-5 py-4 font-medium">
                                                {student.first_name} {student.last_name}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{student.email}</td>
                                            <td className="whitespace-nowrap px-5 py-4">{student.program}</td>
                                            <td className="whitespace-nowrap px-5 py-4">Year {student.year_level}</td>
                                            <td className="whitespace-nowrap px-5 py-4">{student.age}</td>
                                            <td className="whitespace-nowrap px-5 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                <PencilLine className="size-4" />
                                                                Edit
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit student</DialogTitle>
                                                                <DialogDescription>Update the student information.</DialogDescription>
                                                            </DialogHeader>
                                                            <Form
                                                                {...students.update.form({ student: student.id })}
                                                                resetOnSuccess
                                                                onSuccess={() => router.reload()}
                                                                className="grid gap-4 sm:grid-cols-2"
                                                            >
                                                                {({ errors, processing }) => (
                                                                    <>
                                                                        <StudentField
                                                                            label="First name"
                                                                            name="first_name"
                                                                            error={errors.first_name}
                                                                            defaultValue={student.first_name}
                                                                        />
                                                                        <StudentField
                                                                            label="Last name"
                                                                            name="last_name"
                                                                            error={errors.last_name}
                                                                            defaultValue={student.last_name}
                                                                        />
                                                                        <StudentField
                                                                            label="Email"
                                                                            name="email"
                                                                            type="email"
                                                                            error={errors.email}
                                                                            defaultValue={student.email}
                                                                        />
                                                                        <StudentField
                                                                            label="Birthday"
                                                                            name="birthday"
                                                                            type="date"
                                                                            error={errors.birthday}
                                                                            defaultValue={student.birthday}
                                                                        />
                                                                        <StudentField
                                                                            label="Program"
                                                                            name="program"
                                                                            placeholder="e.g. BSIT"
                                                                            error={errors.program}
                                                                            defaultValue={student.program}
                                                                        />
                                                                        <StudentField
                                                                            label="Gender"
                                                                            name="gender"
                                                                            placeholder="e.g. Female"
                                                                            error={errors.gender}
                                                                            defaultValue={student.gender}
                                                                        />
                                                                        <StudentField
                                                                            label="Year level"
                                                                            name="year_level"
                                                                            type="number"
                                                                            min={1}
                                                                            max={4}
                                                                            error={errors.year_level}
                                                                            defaultValue={String(student.year_level)}
                                                                        />
                                                                        <DialogFooter className="sm:col-span-2">
                                                                            <Button type="submit" disabled={processing}>
                                                                                {processing ? 'Saving...' : 'Save changes'}
                                                                            </Button>
                                                                        </DialogFooter>
                                                                    </>
                                                                )}
                                                            </Form>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Form
                                                        {...students.destroy.form({ student: student.id })}
                                                        onSuccess={() => router.reload()}
                                                    >
                                                        <Button type="submit" variant="destructive" size="sm">
                                                            <Trash2 className="size-4" />
                                                            Delete
                                                        </Button>
                                                    </Form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function StudentField({
    label,
    name,
    error,
    type = 'text',
    placeholder,
    min,
    max,
    defaultValue,
}: {
    label: string;
    name: string;
    error?: string;
    type?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    defaultValue?: string | number;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                defaultValue={defaultValue}
                required
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

StudentsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Students',
            href: students.platform(),
        },
    ],
};