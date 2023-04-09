const data = {
  employees: require("../../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEMployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    //here we donot utilise uuid we are just grabbing the last id and adding one to it
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  //here wea re making sure that firstname and lastname are sent if not
  //we are sending 400
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  //now we are using the function to sent the data
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).res.json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => (emp.id = parseInt(req.body.id))
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `"Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) res.json({ message: "No employee with this ID found" });
  const filteredArray = data.employees.filter((emp) => emp.id !== employee);

  data.setEmployees(
    filteredArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res
    .status(200)
    .res.json({
      message: `Employee with id ${employee.id} successfully deleted`,
    });
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    res.status(400).json({ message: `"Employee ID ${req.body.id} not found` });
  }
  res.status(201).res.json(employee);
};

modules.exports = {
  getAllEMployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
