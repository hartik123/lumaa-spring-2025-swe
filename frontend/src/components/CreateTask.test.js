import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CreateTask from './CreateTask'; // Adjust path based on your project

jest.mock('axios'); // Mock Axios requests

describe('Task Creation Component', () => {
  test('should render the form and create a new task on submission', async () => {
    axios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: 'Task created successfully' }
    });

    render(<CreateTask />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Task Description/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Task Date/i), { target: { value: '2025-02-25' } });
    fireEvent.change(screen.getByLabelText(/Task Time/i), { target: { value: '14:30' } });
    fireEvent.change(screen.getByLabelText(/Task Status/i), { target: { value: 'Pending' } });

    // Click the submit button
    fireEvent.click(screen.getByText(/Submit/i));

    // Assert API call was made
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/task/create',
      {
        taskDescription: 'Test Task',
        taskDate: '2025-02-25',
        taskTime: '14:30',
        taskStatus: 'Pending',
      },
      { headers: { Authorization: expect.any(String) } }
    );

    // Assert success message
    await waitFor(() => expect(screen.getByText(/Task created successfully/i)).toBeInTheDocument());
  });

  test('should show an error message if task creation fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Task creation failed'));

    render(<TaskCreation />);

    fireEvent.change(screen.getByLabelText(/Task Description/i), { target: { value: 'Failed Task' } });
    fireEvent.click(screen.getByText(/Create Task/i));

    await waitFor(() => expect(screen.getByText(/Error occurred/i)).toBeInTheDocument());
  });
});
