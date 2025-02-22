import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CreateTask from '../components/CreateTask'; // Adjust the path based on your project structure

jest.mock('axios'); // Mock axios

describe('CreateTask Component', () => {
  test('should allow the user to create a task successfully', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    render(<CreateTask />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Task Date & Time/i), { target: { value: '2025-02-25T14:30' } });
    fireEvent.change(screen.getByLabelText(/Task Description/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Task Status/i), { target: { value: 'InProgress' } });

    // Click submit button
    fireEvent.click(screen.getByText(/Submit/i));

    // Assert that API call is made
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/task/create',
      {
        taskDate: '2025-02-25T14:30',
        taskTime: '23:59',
        taskDescription: 'Test Task',
        taskStatus: 'InProgress'
      },
      { headers: { Authorization: expect.any(String), "Content-Type": "application/json" } }
    );

    // Verify alert message
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Task created successfully!'));
  });

  test('should show an alert when task creation fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Task creation failed'));

    render(<CreateTask />);

    fireEvent.change(screen.getByLabelText(/Task Date & Time/i), { target: { value: '2025-02-25T14:30' } });
    fireEvent.change(screen.getByLabelText(/Task Description/i), { target: { value: 'Failed Task' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Task creation failed'));
  });
});
