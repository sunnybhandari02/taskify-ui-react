import React, { useState } from 'react';
import { Task, useTask } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Clock, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Flag,
  CheckCircle2 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import EditTaskDialog from './EditTaskDialog';
import { toast } from '@/hooks/use-toast';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTask();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleToggleComplete = async () => {
    await toggleTask(task.id);
    toast({
      title: task.completed ? "Task marked as pending" : "Task completed!",
      description: task.completed ? 
        "Task has been moved back to pending." : 
        "Great job! Keep up the momentum.",
    });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    toast({
      title: "Task deleted",
      description: "The task has been permanently removed.",
    });
    setShowDeleteDialog(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <>
      <Card className={`border-0 shadow-sm transition-all duration-200 hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue ? 'border-l-4 border-l-destructive' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggleComplete}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium leading-tight ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.completed ? 'text-muted-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                <Flag className="mr-1 h-3 w-3" />
                {task.priority}
              </Badge>
              
              {task.completed && (
                <Badge variant="outline" className="text-xs text-success border-success">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Done
                </Badge>
              )}
            </div>

            {task.dueDate && (
              <div className={`flex items-center space-x-1 text-xs ${
                isOverdue ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                <Calendar className="h-3 w-3" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Created {formatDate(task.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditTaskDialog 
        task={task}
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      />
    </>
  );
};

export default TaskCard;