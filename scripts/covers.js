const axios = require('axios')
const fs = require('fs')
const _ = require('lodash')
const cheerio = require('cheerio')

// List of book titles with subtitles
const bookTitles = [
  'Zero to One: Notes on Startups, or How to Build the Future',
  'The Lean Startup: How Today’s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses',
  'The Hard Thing About Hard Things: Building a Business When There Are No Easy Answers',
  'Founders at Work: Stories of Startups’ Early Days',
  'The PayPal Wars: Battles with eBay, the Media, the Mafia, and the Rest of Planet Earth',
  'The Mythical Man-Month: Essays on Software Engineering',
  'Skunk Works: A Personal Memoir of My Years of Lockheed',
  'The Dream Machine: J.C.R. Licklider and the Revolution That Made Computing Personal',
  'Dealers of Lightning: Xerox PARC and the Dawn of the Computer Age',
  'Thinking in Systems: A Primer',
  'A Pattern Language: Towns, Buildings, Construction',
  'Mindstorms: Children, Computers, and Powerful Ideas',
  'Gödel, Escher, Bach: An Eternal Golden Braid',
  'The Power Broker: Robert Moses and the Fall of New York',
  'Titan: The Life of John D. Rockefeller, Sr.',
  'The Rise of Theodore Roosevelt',
  'The Making of the Atomic Bomb',
  'The Tinkerings of Robert Noyce: How the Mavericks of Silicon Valley Made the Modern Computer Age',
  'Revolution in the Valley: The Insanely Great Story of How the Mac Was Made',
  'The Whole Earth Catalog',
  'What the Dormouse Said: How the 60s Counterculture Shaped the Personal Computer Industry',
  'The Big Score: The Billion-Dollar Story of Silicon Valley',
  'Zen and the Art of Motorcycle Maintenance: An Inquiry into Values',
  'Finite and Infinite Games: A Vision of Life as Play and Possibility',
  'The Selfish Gene',
  'Seeing Like a State: How Certain Schemes to Improve the Human Condition Have Failed',
  'Superintelligence: Paths, Dangers, Strategies',
  'The Diamond Age: Or, A Young Lady’s Illustrated Primer',
  'Softwar: An Intimate Portrait of Larry Ellison and Oracle',
  'The Sovereign Individual: Mastering the Transition to the Information Age',
  'The Rise and Fall of American Growth: The U.S. Standard of Living since the Civil War',
  'Showstopper: The Breakneck Race to Create Windows NT and the Next Generation at Microsoft',
  'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
]

const getBookCoverUrl = async (bookTitle) => {
  try {
    const searchUrl = `https://www.goodreads.com/search?q=${encodeURIComponent(bookTitle)}`
    const { data } = await axios.get(searchUrl)
    const $ = cheerio.load(data)

    // Find the first book cover image in the search results
    const result = $('img.bookCover').first()
    if (result) {
      let imageUrl = result.attr('src')

      // Remove any _SY75_, _SX50_, or similar parts from the URL to get the high-res image
      imageUrl = imageUrl.replace(/._S[XY0-9]+_/, '')

      return imageUrl
    }
    return null
  } catch (error) {
    console.error(`Error fetching cover for "${bookTitle}": ${error.message}`)
    return null
  }
}

const main = async () => {
  for (const bookTitle of bookTitles) {
    const url = await getBookCoverUrl(bookTitle)
    if (url) {
      // Fetch the image as a buffer
      const response = await axios.get(url, { responseType: 'arraybuffer' })

      // Write the image buffer to a file
      fs.writeFileSync(
        `src/images/books/${_.kebabCase(bookTitle.split(':')[0])}.jpg`,
        response.data,
      )

      console.log(url)
    } else {
      console.log(`Could not find cover for "${bookTitle}"`)
    }
  }
}

main().catch((error) => console.error(error))
