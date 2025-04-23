import fs from "fs";
import axios from "axios";

const API_ENDPOINT = "http://localhost:4125/api/books";

const titles = [
  "The Silent Patient",
  "Where the Crawdads Sing",
  "The Midnight Library",
  "The Vanishing Half",
  "The Seven Husbands of Evelyn Hugo",
  "The Invisible Life of Addie LaRue",
  "Circe",
  "The Song of Achilles",
  "The Night Circus",
  "The Goldfinch",
  "Big Little Lies",
  "Little Fires Everywhere",
  "Normal People",
  "Educated",
  "The Tattooist of Auschwitz",
  "The Book Thief",
  "All the Light We Cannot See",
  "The Nightingale",
  "The Help",
  "The Girl on the Train",
  "Gone Girl",
  "Sharp Objects",
  "Before We Were Strangers",
  "The Rosie Project",
  "The Alchemist",
  "The Power of Habit",
  "Atomic Habits",
  "Sapiens",
  "Educated",
  "Becoming",
  "The Subtle Art of Not Giving a F*ck",
  "The 5 AM Club",
  "The Four Agreements",
  "The Secret",
  "Rich Dad Poor Dad",
  "The Intelligent Investor",
  "The Lean Startup",
  "Start with Why",
  "Zero to One",
  "The Hard Thing About Hard Things",
  "Principles",
  "The Art of War",
  "Good to Great",
  "The Innovator's Dilemma",
  "The Lean Entrepreneur",
  "The Startup Owner's Manual",
  "The E-Myth Revisited",
  "The $100 Startup",
  "The Millionaire Next Door",
];

const authors = [
  "Alex Michaelides",
  "Delia Owens",
  "Matt Haig",
  "Brit Bennett",
  "Taylor Jenkins Reid",
  "V.E. Schwab",
  "Madeline Miller",
  "Erin Morgenstern",
  "Donna Tartt",
  "Liane Moriarty",
  "Celeste Ng",
  "Sally Rooney",
  "Tara Westover",
  "Heather Morris",
  "Markus Zusak",
  "Anthony Doerr",
  "Kristin Hannah",
  "Kathryn Stockett",
  "Paula Hawkins",
  "Gillian Flynn",
  "Gillian Flynn",
  "Gillian Flynn",
  "Renée Carlino",
  "Graeme Simsion",
  "Paulo Coelho",
  "Charles Duhigg",
  "James Clear",
  "Yuval Noah Harari",
  "Tara Westover",
  "Michelle Obama",
  "Mark Manson",
  "Robin Sharma",
  "Don Miguel Ruiz",
  "Rhonda Byrne",
  "Robert Kiyosaki",
  "Benjamin Graham",
  "Eric Ries",
  "Simon Sinek",
  "Peter Thiel",
  "Ben Horowitz",
  "Ray Dalio",
  "Sun Tzu",
  "Jim Collins",
  "Clayton Christensen",
  "Brant Cooper",
  "Steve Blank",
  "Michael Gerber",
  "Chris Guillebeau",
  "Thomas J. Stanley",
];

const categories = [
  "Fiction",
  "Mystery",
  "Fantasy",
  "Historical Fiction",
  "Romance",
  "Science Fiction",
  "Biography",
  "Self-Help",
  "Business",
  "Non-Fiction",
  "Thriller",
  "Young Adult",
  "Horror",
  "Adventure",
  "Science",
  "Philosophy",
  "Psychology",
  "Health",
  "Politics",
  "Economics",
  "Religion",
  "Travel",
  "Cookbook",
  "Art",
  "Music",
  "Poetry",
  "Graphic Novel",
  "Children's",
  "Humor",
  "Sports",
  "True Crime",
  "Parenting",
  "Education",
  "Technology",
  "Environment",
  "Spirituality",
  "Mindfulness",
  "Leadership",
  "Motivation",
  "Creativity",
  "Innovation",
  "Marketing",
  "Finance",
  "Investing",
  "Entrepreneurship",
];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate random book data
function generateBookData(id) {
  const title = titles[getRandomInt(0, titles.length - 1)];
  const author = authors[getRandomInt(0, authors.length - 1)];
  const category = categories[getRandomInt(0, categories.length - 1)];
  const coverUrl =
    "https://images.pexels.com/photos/random/?query=book&orientation=landscape";
  const progress = getRandomInt(0, 100);
  const lastOpened = new Date(
    Date.now() - getRandomInt(0, 365) * 24 * 60 * 60 * 1000
  ).toISOString();

  return {
    title,
    author,
    category,
    coverUrl,
    progress,
    lastOpened,
    id,
  };
}
// Generate books
const books = Array.from({ length: 50 }, (_, index) =>
  generateBookData(index + 1)
);

// POST each book to the API
const postBooks = async () => {
  for (const book of books) {
    try {
      const response = await axios.post(API_ENDPOINT, book);
      //   console.log(`Posted book ID ${book.id}:`, response.status);
    } catch (error) {
      console.error(`Failed to post book ID ${book.id}:`, error.message);
      break;
    }
  }
};

// Save locally too (optional)
fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
console.log("Saved to books.json");

// Run the posting function
postBooks();
