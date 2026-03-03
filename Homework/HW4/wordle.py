import random


class WordleGame:
    # Set up files game settings and tracking state
    def __init__(self):
        self.max_attempts = 6
        self.words_file = "words.txt"
        self.answer_file = "answer.txt"

        # Load all valid words
        self.word_bank = self.load_word_bank()

        # Pick random answer and save it to answer.txt
        self.answer = random.choice(self.word_bank)
        self.write_answer()

        # Track letters
        self.good_letters = []
        self.bad_letters = []
        self.correct_letters = ["", "", "", "", ""]

    # Return list of words from words.txt
    def load_word_bank(self):
        words = []
        with open(self.words_file, "r", encoding="utf-8") as file:
            for line in file:
                # Strip \n and uppercase
                word = line.strip().upper()
                words.append(word)
        return words

    # Save random answer to answer.txt
    def write_answer(self):
        with open(self.answer_file, "w", encoding="utf-8") as file:
            file.write(self.answer)

    # Prompt input until user provides a 5 letter word from Word Bank
    def get_valid_guess(self):
        while True:
            guess = input("Enter 5-letter word: ").strip().upper()

            if len(guess) != 5:
                print("Invalid word (Enter 5 letters)")
                continue

            if guess not in self.word_bank:
                print("Invalid word (Not in Word Bank)")
                continue

            return guess

    # Update good, bad, and correct letters
    def update_letters(self, guess):
        for index, letter in enumerate(guess):
            if letter in self.answer:
                if letter not in self.good_letters:
                    self.good_letters.append(letter)
            else:
                if letter not in self.bad_letters:
                    self.bad_letters.append(letter)

            if letter == self.answer[index]:
                self.correct_letters[index] = letter

    # Print the current cumulative game state
    def print_letters(self):
        print(f"Good = {self.good_letters}")
        print(f"Bad = {self.bad_letters}")
        print(f"correct = {self.correct_letters}")

    # Play function that runs the game loop and handles win/loss conditions
    def play(self):
        attempts = 0
        while attempts < self.max_attempts:
            guess = self.get_valid_guess()
            attempts += 1
            if guess == self.answer:
                print(
                    f"Congratulations, you correctly identified the word after {attempts} attempts"
                )
                return
            
            # Print attempt number an update and print letters
            print(f"Attempt {attempts} of {self.max_attempts}")
            self.update_letters(guess)
            self.print_letters()
        print(
            f"The answer is {self.answer}. You did not correctly guess it within 6 tries."
        )


if __name__ == "__main__":
    # Create one game object and start the game loop
    game = WordleGame()
    game.play()
