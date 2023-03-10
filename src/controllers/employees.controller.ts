import { Request, Response } from "express";
import { pool } from "../db";

export const getEmployees = async (_: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Sometthing goes wrong",
    });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (Array.isArray(rows)) {
      if (rows.length <= 0)
        return res.status(404).json({
          message: "Employee not found",
        });
      return res.json(rows[0]);
    } else {
      return res.status(500);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Sometthing goes wrong",
    });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee(name, salary) VALUES (?, ?)",
      [name, salary]
    );
    let tempResult: any = rows;
    res.send({
      id: tempResult.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Sometthing goes wrong",
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    let tempResult3: any = result;

    if (tempResult3.affectedRows === 0)
      return res.status(404).json({
        message: "User not found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    if (Array.isArray(rows)) return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Sometthing goes wrong",
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    let tempResult2: any = result;

    if (tempResult2.affectedRows <= 0)
      res.status(404).json({
        message: "Employee not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Sometthing goes wrong",
    });
  }
};
