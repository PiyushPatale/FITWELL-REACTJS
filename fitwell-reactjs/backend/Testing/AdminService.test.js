const AdminServices = require('../services/AdminServices');
const AdminFeedback = require('../models/contactform');

jest.mock('../models/contactform');

describe('AdminServices', () => {
  describe('getAllAdminFeedback', () => {
    it('should return all admin feedbacks', async () => {
      // Mock the behavior of the AdminFeedback model's `find` method
      const mockFeedbacks = [
        { name: 'patel', email: 'kartik@gmail.com', phone: '1234567890', subject: 'Test1', message: 'Message 2' },
        { name: 'kartik', email: 'patel@outlook.com', phone: '9876543210', subject: 'Test2', message: 'Message 2' }
      ];
      AdminFeedback.find.mockResolvedValue(mockFeedbacks);
      const result = await AdminServices.getAllAdminFeedback();

      //console.log("🚀 ~ it ~ result:", result)
      expect(result.error).toBe(false);
      expect(result.msg).toBe('Admins Fetched Successfully');
      expect(result.data).toEqual(mockFeedbacks);
    });

    it('should handle errors', async () => {
      // Mock AdminFeedback model's `find` method to throw an error
      AdminFeedback.find.mockRejectedValue(new Error('Database error'));
      const result = await AdminServices.getAllAdminFeedback();

      expect(result.error).toBe(true);
      expect(result.msg).toBe('Database error');
    });
  });
});
