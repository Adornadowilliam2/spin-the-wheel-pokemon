import random

# Define the symbols for the slot machine
symbols = ['🍒', '🍊', '🍉', '🍓', '🍀']

# Define the number of reels and rows
reels = 3
rows = 3

# Define the payout table
payouts = {
    '🍒': 10,
    '🍊': 20,
    '🍉': 30,
    '🍓': 40,
    '🍀': 50
}

# Function to generate the slot machine spin result
def spin_reels():
    return [[random.choice(symbols) for _ in range(reels)] for _ in range(rows)]

# Function to check if there is a win
def check_win(spin_result):
    # Check rows for a win
    for row in spin_result:
        if len(set(row)) == 1:
            return True, row[0]  # Win if all symbols are the same
    return False, None

# Function to calculate the payout
def calculate_payout(symbol):
    return payouts.get(symbol, 0)

# Main game loop
def play_slot_machine():
    balance = 100  # Start with a balance of 100
    print("Welcome to the Casino Slot Machine!")
    print(f"Your starting balance is: ${balance}")
    
    while balance > 0:
        print("\n----------------------------")
        print(f"Current Balance: ${balance}")
        
        # Ask the player to bet
        bet = int(input("Enter your bet (1 to quit): "))
        
        if bet == 1:
            print("Thanks for playing!")
            break

        if bet > balance:
            print("You don't have enough balance to make that bet!")
            continue

        balance -= bet
        print("\nSpinning the reels...")

        # Spin the reels and display the result
        spin_result = spin_reels()
        for row in spin_result:
            print(" | ".join(row))
        
        # Check if the player wins
        win, symbol = check_win(spin_result)
        if win:
            print(f"\nYou won! All {symbol} in a row!")
            payout = calculate_payout(symbol)
            print(f"Your payout is: ${payout * bet}")
            balance += payout * bet
        else:
            print("\nNo win, try again!")

# Run the game
if __name__ == "__main__":
    play_slot_machine()
