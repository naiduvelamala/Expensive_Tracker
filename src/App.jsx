import { useState,useEffect } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'

function App() {
  const [expenseData,setExpenseData] =useState([])

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('expenseData')) || [];
    setExpenseData(storedData);
  },[])

  const addExpense=(newExpense)=>{
    setExpenseData((prevdata)=>{
      const newData = [...prevdata,newExpense];
      localStorage.setItem('expenseData', JSON.stringify(newData));
      return newData;
    })
  }
  const totalAmount = expenseData.reduce((sum, expense) => {
  // return sum + parseFloat(expense.amount || 0);
  }, 0);

  const deleteExpense = (id) => {
    setExpenseData((prevData) => {
      const newData = prevData.filter((expense) => expense.id !== id);
      localStorage.setItem('expenseData', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <div className="APP">
      <ExpenseForm onAddExpense={addExpense}/>
      <ExpenseTable onDeleteExpense={deleteExpense} expenseData={expenseData}/>
    </div>
  )
}

export default App
