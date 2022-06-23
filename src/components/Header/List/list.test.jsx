import { render, screen, fireEvent } from "@testing-library/react";
import List from "./List";

describe("List component", () => {
  it("should creat a new task", () => {
    render(<List />);
    const input = screen.getByPlaceholderText("Adicionar nova tarefa");
    const botao = screen.getByTestId("add-task");

    fireEvent.change(input, {
      target: {
        value: "Estudar react",
      },
    });

    fireEvent.click(botao);

    const itemUmLista = screen.getByText("Estudar react");
    expect(itemUmLista).toHaveTextContent("Estudar react");

    fireEvent.change(input, {
      target: {
        value: "Estudar js",
      },
    });
    fireEvent.click(botao);

    const itemDoisLista = screen.getByText("Estudar js");
    expect(itemDoisLista).toHaveTextContent("Estudar js");
  });

  it("should not creat a new task when the title is empty", () => {
    render(<List />);
    const botao = screen.getByTestId("add-task");

    fireEvent.click(botao);

    expect(screen.queryByTestId("task")).not.toBeInTheDocument();
  });

  it("should be able to delete a task", () => {
    render(<List />);
    const input = screen.getByPlaceholderText("Adicionar nova tarefa");
    const botao = screen.getByTestId("add-task");

    fireEvent.change(input, {
      target: {
        value: "Estudar react",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Estudar js",
      },
    });
    fireEvent.click(botao);

    const itemUmLista = screen.getByText("Estudar react");
    const itemDoisLista = screen.getByText("Estudar js");

    expect(itemUmLista).toBeInTheDocument();
    expect(itemDoisLista).toBeInTheDocument();

    const [itemUmListaBotaoRemover] = screen.getAllByTestId("remove-task");

    fireEvent.click(itemUmListaBotaoRemover);

    expect(itemUmLista).not.toBeInTheDocument();
    expect(itemDoisLista).toBeInTheDocument();
  });

  it("should be able to complete a task", () => {
    render(<List />);

    const input = screen.getByPlaceholderText("Adicionar nova tarefa");
    const botao = screen.getByTestId("add-task");

    fireEvent.change(input, {
      target: {
        value: "Estudar react",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Estudar js",
      },
    });
    fireEvent.click(botao);

    const [item1, item2] = screen.getAllByTestId("task");

    if (item1.firstChild) {
      fireEvent.click(item1.firstChild);
    }

    expect(item1).toBeInTheDocument();
    expect(item1).toHaveClass("completed");

    expect(item2).toBeInTheDocument();
    expect(item2).not.toHaveClass("completed");
  });
});
