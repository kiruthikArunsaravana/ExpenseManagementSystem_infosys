package com.infosys.expenseManagementApplication.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.infosys.expenseManagementApplication.bean.Category;
import com.infosys.expenseManagementApplication.bean.Customer;
import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.dao.CustomerDao;
import com.infosys.expenseManagementApplication.dao.ExpenseDao;
import com.infosys.expenseManagementApplication.service.ExpenseUserService;

@RestController
@RequestMapping("/exp-mng/")
@CrossOrigin(origins = "http://localhost:5656")
public class ExpenseReportController {
	@Autowired
	private CustomerDao customerDao;
	
    @Autowired
    private ExpenseUserService service;
    
	@Autowired
    private ExpenseDao expenseDao;

	@GetMapping("/expense-number")
	public String generateExpenseNumber() {
		return expenseDao.generateExpenseNumber();
	}
	
	@GetMapping("/expenses")
	public List<Expense> getAllExpenses(){
		return expenseDao.getAllExpenses();
	}
	
	@GetMapping("/expense-cust")
    public List<Expense> getExpensesByCustomer(){
		String userId=service.getUserId();
		System.out.println("UserId:"+userId);
		Customer customer=customerDao.getCustomerByUsername(userId);
		String customerId=customer.getCustomerId();
		System.out.println("Customer:"+customerId);
		return expenseDao.getExpensesByCustomer(customerId);
    }  

	@GetMapping("/expense-cust/{id}")
	public List<Expense> getExpensessByCustomer(@PathVariable String id){
		return expenseDao.getExpensesByCustomer(id);
	}
	
	//above both functions have the same name Method Overloading one have
	//same name with no parameter and another with different name 
	
    @GetMapping("/expense-cat/{id}")
    public List<Expense> getExpensesByCategory(@PathVariable Long categoryId) {
        return expenseDao.getExpensesByCategory(categoryId);
    }
    
    @PostMapping("/add-expense")
    public Expense saveExpense(@RequestBody Expense expense) {
    	String userId=service.getUserId();
    	System.out.println("UserId:"+userId);
		Customer customer=customerDao.getCustomerByUsername(userId);
		String customerId=customer.getCustomerId();
		System.out.println("Customer:"+customerId);
		// Set the customerId in the expense
	    expense.setCustomerId(customerId);
        return expenseDao.save(expense);
    }

    @DeleteMapping("/expense/delete/{id}")
    public void deleteExpenseById(@PathVariable String id) {
    	expenseDao.deleteExpenseById(id);
    }
    
    @PutMapping("/update-expense/{id}")
	public void updateExpense(@RequestBody Expense expense){
		expenseDao.save(expense);
	}
    
    @GetMapping("/expense/{id}")
    public Expense getExpenseById(@PathVariable String id) {
    	return expenseDao.getExpenseById(id);
    }
    
    
    
	
	


}
