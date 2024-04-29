import { render, screen, waitFor } from "@testing-library/react";
import Board from "./board";
import userEvent from "@testing-library/user-event";

describe("Board component", () => {
  it("Board should render correctly", () => {
    render(<Board />);
    const elem = screen.getByRole("Board");
    expect(elem).toBeInTheDocument();
  });

  it("Check that the drop works correctly", async () => {
    render(<Board />);
    const squares = screen.getAllByTestId("Square");
    for (let i = 0; i < 7; i++) {
      userEvent.click(squares[0]);
    }

    await waitFor(() => {
      expect(squares[42]).toHaveTextContent("X");
      expect(squares[35]).toHaveTextContent("O");
      expect(squares[28]).toHaveTextContent("X");
      expect(squares[21]).toHaveTextContent("O");
      expect(squares[14]).toHaveTextContent("X");
      expect(squares[7]).toHaveTextContent("O");
      expect(squares[0]).toHaveTextContent("X");
    });
  });

  it("Checking win condition", () => {
    render(<Board />);
    const squares = screen.getAllByTestId("Square");

    for (let i = 0; i < 5; i++) {
    
        userEvent.click(squares[i]);
     

 
        userEvent.click(squares[i]);

    }
    setTimeout(()=>{
        const winners = screen.getAllByTestId("WinningSquare");
        expect(winners.length).toEqual(4);
        winners.forEach((w)=>{
            expect(w).toHaveTextContent("X");
        });
    },1000);

  }),

  it("Checking up and down win condition",()=>{
    render(<Board />);
    const squares = screen.getAllByTestId("Square");

    for (let i = 0; i < 5; i++) {
    
        userEvent.click(squares[0]);
     

 
        userEvent.click(squares[1]);

    }
    setTimeout(()=>{
        const winners = screen.getAllByTestId("WinningSquare");
        expect(winners.length).toEqual(4);
        winners.forEach((w)=>{
            expect(w).toHaveTextContent("X");
        });
    },1000);

  });
});
