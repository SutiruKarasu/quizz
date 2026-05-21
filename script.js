// =========================================================================
// 1. ALL QUIZ QUESTIONS (Integrierte Datenbank)
// =========================================================================
const rawQuizData = [
  { "topic": "Pop Culture", "question": "Who is known as the 'King of Pop'?", "answers": ["Michael Jackson", "Prince", "Elvis Presley", "Justin Timberlake"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which platform is best known for its short-form, viral dance videos?", "answers": ["TikTok", "Instagram", "YouTube", "Facebook"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the real name of the rapper Eminem?", "answers": ["Marshall Mathers", "Shawn Carter", "Curtis Jackson", "Calvin Broadus"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which artist’s 'Eras Tour' became the highest-grossing concert tour of all time?", "answers": ["Taylor Swift", "Beyoncé", "Madonna", "Adele"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of Kim Kardashian's shapewear brand?", "answers": ["SKIMS", "Good American", "Ivy Park", "Fenty"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which British royal married Meghan Markle in 2018?", "answers": ["Prince Harry", "Prince William", "King Charles III", "Prince Andrew"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What social media platform was rebranded from Twitter to 'X' in 2023?", "answers": ["X", "Threads", "Bluesky", "Mastodon"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Who is the most-followed individual on Instagram (as of 2026)?", "answers": ["Cristiano Ronaldo", "Lionel Messi", "Selena Gomez", "Kylie Jenner"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which famous pop star famously wore a dress made of raw meat to the 2010 MTV VMAs?", "answers": ["Lady Gaga", "Miley Cyrus", "Rihanna", "Katy Perry"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which K-pop group gained global fame with the hit song 'Dynamite'?", "answers": ["BTS", "BLACKPINK", "EXO", "Stray Kids"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the AI chatbot that launched in November 2022 and became a viral sensation?", "answers": ["ChatGPT", "Claude", "Gemini", "Bard"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which fashion accessory, popularized by Carrie Bradshaw, became an international phenomenon?", "answers": ["Fendi Baguette", "Birkin Bag", "Gucci Belt", "Prada Backpack"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of Beyoncé’s 2024 album that blended country and pop?", "answers": ["Cowboy Carter", "Renaissance", "Lemonade", "4"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which artist released the album Thriller, the best-selling record of all time?", "answers": ["Michael Jackson", "Queen", "The Eagles", "AC/DC"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What nickname is commonly used for Jennifer Lopez?", "answers": ["J.Lo", "J.Po", "Jenny", "J-Lo"], "correct": 0 },
  { "topic": "Pop Culture", "singer’s debut album was titled 19?": "What is the chemical formula for water?", "answers": ["Adele", "Taylor Swift", "Lana Del Rey", "Dua Lipa"], "correct": 0 },
  { "topic": "Pop Culture", "question": "In the world of sports, who won the 2022 FIFA World Cup?", "answers": ["Argentina", "France", "Brazil", "Germany"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which artist’s album BRAT inspired the 'brat summer' aesthetic in 2024?", "answers": ["Charli XCX", "Olivia Rodrigo", "Dua Lipa", "Billie Eilish"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What does the acronym 'smh' stand for in internet slang?", "answers": ["Shaking my head", "So much hate", "Sending my help", "Some major humor"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Who is married to music mogul Jay-Z?", "answers": ["Beyoncé", "Rihanna", "Alicia Keys", "Nicki Minaj"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which music competition show crowned Kelly Clarkson as its first-ever winner?", "answers": ["American Idol", "The Voice", "X Factor", "America's Got Talent"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of Kylie Jenner's cosmetics brand?", "answers": ["Kylie Cosmetics", "Rare Beauty", "Fenty Beauty", "Haus Labs"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which legendary rock band included members John Lennon and Paul McCartney?", "answers": ["The Beatles", "The Rolling Stones", "The Who", "Pink Floyd"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which pop song named after a caffeine-filled beverage dominated charts in 2024?", "answers": ["Espresso", "Latte", "Cappuccino", "Mocha"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Who is the creator of the pop art movement known for using comic-book style images?", "answers": ["Roy Lichtenstein", "Andy Warhol", "Keith Haring", "Jeff Koons"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What was the name of the ship that famously blocked the Suez Canal in 2021?", "answers": ["The Ever Given", "Titanic", "The Evergreen", "The Suez Star"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which artist is known by her fans as 'Mother Monster'?", "answers": ["Lady Gaga", "Madonna", "Ariana Grande", "Nicki Minaj"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the real name of the singer Rihanna?", "answers": ["Robyn Rihanna Fenty", "Rihanna Knowles", "Robyn Fenty-Gaga", "Rihanna Smith"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which band is famous for the hit song 'Bohemian Rhapsody'?", "answers": ["Queen", "Led Zeppelin", "The Beatles", "Aerosmith"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Who is the lead singer of the band Coldplay?", "answers": ["Chris Martin", "Thom Yorke", "Bono", "Brandon Flowers"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the annual gala held at the Metropolitan Museum of Art?", "answers": ["The Met Gala", "The Oscars", "The Grammys", "The Golden Globes"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which celebrity couple is famously nicknamed 'Bennifer'?", "answers": ["Ben Affleck and Jennifer Lopez", "Ben Stiller and Jennifer Aniston", "Ben Platt and Jennifer Lawrence", "Ben Foster and Jennifer Garner"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which rapper headlined the 2025 Super Bowl halftime show?", "answers": ["Kendrick Lamar", "Jay-Z", "Eminem", "Drake"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of Billie Eilish’s brother who produces her music?", "answers": ["Finneas O'Connell", "Patrick O'Connell", "Jack Antonoff", "Bruno Mars"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which iconic 80s track by Kate Bush returned to the charts in the 2020s?", "answers": ["Running Up That Hill", "Cloudbusting", "Wuthering Heights", "Babooshka"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the popular video game streaming platform owned by Amazon?", "answers": ["Twitch", "Kick", "YouTube Gaming", "Mixer"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which social media app was the first to use the 'Stories' feature?", "answers": ["Snapchat", "Instagram", "Facebook", "Twitter"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the youngest child of Kim Kardashian and Kanye West?", "answers": ["Psalm", "North", "Saint", "Chicago"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which artist released the blockbuster album Lemonade?", "answers": ["Beyoncé", "Rihanna", "Adele", "Taylor Swift"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the title of Olivia Rodrigo’s debut studio album?", "answers": ["SOUR", "GUTS", "Happier", "Drivers License"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the term for a short, looping video clip used for reactions on social media?", "answers": ["GIF", "JPEG", "MP4", "PNG"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which pop icon is known for her 'Little Monster' fanbase?", "answers": ["Lady Gaga", "Britney Spears", "Katy Perry", "Demi Lovato"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the famous annual music festival held in the California desert?", "answers": ["Coachella", "Lollapalooza", "Glastonbury", "Burning Man"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which Mariah Carey song charts nearly every year during the holiday season?", "answers": ["All I Want for Christmas is You", "Santa Baby", "Silent Night", "Last Christmas"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What year was the first iPhone released?", "answers": ["2007", "2005", "2009", "2006"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which famous athlete is known as 'The King' in the NBA?", "answers": ["LeBron James", "Michael Jordan", "Kobe Bryant", "Stephen Curry"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the viral collectible monster-shaped toy that went viral in 2025?", "answers": ["Labubu", "Squishmallow", "Funko Pop", "Beanie Baby"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the full name of Billie Eilish?", "answers": ["Billie Eilish Pirate Baird O'Connell", "Billie Eilish O'Connell", "Billie Pirate O'Connell", "Billie Baird O'Connell"], "correct": 0 },
  { "topic": "Pop Culture", "question": "Which famous singing competition is hosted by Carson Daly?", "answers": ["The Voice", "American Idol", "X Factor", "Britain's Got Talent"], "correct": 0 },
  { "topic": "Pop Culture", "question": "What is the name of the social media platform that launched as a competitor to X/Twitter in 2023?", "answers": ["Threads", "BlueSky", "Mastodon", "Truth Social"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the best-selling video game of all time?", "answers": ["Minecraft", "Tetris", "GTA V", "Wii Sports"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the protagonist in the Tomb Raider series?", "answers": ["Lara Croft", "Elena Fisher", "Jill Valentine", "Samus Aran"], "correct": 0 },
  { "topic": "Gaming", "question": "Which company developed the PlayStation?", "answers": ["Sony", "Nintendo", "Sega", "Microsoft"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the plumber with the red cap?", "answers": ["Mario", "Luigi", "Wario", "Bowser"], "correct": 0 },
  { "topic": "Gaming", "question": "In which game is “Master Chief” the main character?", "answers": ["Halo", "Doom", "Call of Duty", "Destiny"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the world Sonic the Hedgehog runs through?", "answers": ["Green Hill Zone", "Mushroom Kingdom", "Hyrule", "Los Santos"], "correct": 0 },
  { "topic": "Gaming", "question": "Which character always wears a green tunic in Zelda?", "answers": ["Link", "Zelda", "Ganondorf", "Navi"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of Valve’s platform for PC games?", "answers": ["Steam", "Epic Games Store", "Origin", "GOG"], "correct": 0 },
  { "topic": "Gaming", "question": "Which game features the Battle Royale map “Erangel”?", "answers": ["PUBG", "Fortnite", "Apex Legends", "Call of Duty: Warzone"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the villain who kidnaps Princess Peach?", "answers": ["Bowser", "Wario", "Donkey Kong", "King Boo"], "correct": 0 },
  { "topic": "Gaming", "question": "Which country is the company Nintendo from?", "answers": ["Japan", "USA", "South Korea", "China"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the yellow creature that eats dots in a Labyrinth?", "answers": ["Pac-Man", "Pikachu", "Kirby", "Sonic"], "correct": 0 },
  { "topic": "Gaming", "question": "In which blocky game do you build a base to survive against monsters?", "answers": ["Minecraft", "Terraria", "Roblox", "Stardew Valley"], "correct": 0 },
  { "topic": "Gaming", "question": "Which character is known for the line “It’s-a me, Mario!”?", "answers": ["Mario", "Luigi", "Toad", "Wario"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the main character in “The Witcher”?", "answers": ["Geralt of Rivia", "Ciri", "Yennefer", "Dandelion"], "correct": 0 },
  { "topic": "Gaming", "question": "What genre is “Call of Duty”?", "answers": ["First-Person Shooter", "RPG", "Strategy", "Puzzle"], "correct": 0 },
  { "topic": "Gaming", "question": "Which animal is Mario’s companion that you can ride?", "answers": ["Yoshi", "Donkey Kong", "Koopa Troopa", "Goomba"], "correct": 0 },
  { "topic": "Gaming", "question": "Which console became famous for using a remote as a controller?", "answers": ["Nintendo Wii", "PlayStation 3", "Xbox 360", "GameCube"], "correct": 0 },
  { "topic": "Gaming", "question": "Who developed the game “League of Legends”?", "answers": ["Riot Games", "Valve", "Blizzard", "Ubisoft"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the company behind “Fortnite”?", "answers": ["Epic Games", "Activision", "EA", "Tencent"], "correct": 0 },
  { "topic": "Gaming", "question": "In which city is “GTA V” mainly set?", "answers": ["Los Santos", "Liberty City", "Vice City", "San Fierro"], "correct": 0 },
  { "topic": "Gaming", "question": "Which video game is famous for “Creepers”?", "answers": ["Minecraft", "Fallout", "Dark Souls", "Halo"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of Link’s sword in Zelda?", "answers": ["Master Sword", "Excalibur", "Soul Edge", "Dragonslayer"], "correct": 0 },
  { "topic": "Gaming", "question": "Which character is known for his “Hadouken” move?", "answers": ["Ryu", "Ken", "Akuma", "Chun-Li"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the red ghost in “Pac-Man”?", "answers": ["Blinky", "Pinky", "Inky", "Clyde"], "correct": 0 },
  { "topic": "Gaming", "question": "Which console was released in Japan in 1994?", "answers": ["PlayStation 1", "Nintendo 64", "Sega Saturn", "Game Boy Color"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the developer of “Cyberpunk 2077”?", "answers": ["CD Projekt Red", "Ubisoft", "Rockstar Games", "Bethesda"], "correct": 0 },
  { "topic": "Gaming", "question": "In which game do you have to catch creatures in balls?", "answers": ["Pokémon", "Monster Hunter", "Digimon", "Ark"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the hero in the first “Assassin’s Creed”?", "answers": ["Altaïr", "Ezio", "Connor", "Edward Kenway"], "correct": 0 },
  { "topic": "Gaming", "question": "What kind of animal is Crash from the “Crash Bandicoot” series?", "answers": ["Bandicoot", "Fox", "Raccoon", "Cat"], "correct": 0 },
  { "topic": "Gaming", "question": "Which game drops you on an island where you have to fight to survive?", "answers": ["PUBG", "Minecraft", "FIFA", "Portal"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the weapon in “Portal” that shoots holes in walls?", "answers": ["Portal Gun", "Gravity Gun", "Ray Gun", "Plasma Rifle"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the leader of the Ghost unit in “Modern Warfare”?", "answers": ["Ghost", "Soap", "Captain Price", "Gaz"], "correct": 0 },
  { "topic": "Gaming", "question": "Which character has an “S” on his chest and flies?", "answers": ["Superman", "Batman", "Spider-Man", "Iron Man"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the currency in the Zelda games?", "answers": ["Rupees", "Gold", "Coins", "Gil"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the game with “Zombies” and “Plants”?", "answers": ["Plants vs. Zombies", "Left 4 Dead", "Dead Rising", "Resident Evil"], "correct": 0 },
  { "topic": "Gaming", "question": "What kind of creature is Spyro from the game series “Spyro”?", "answers": ["Dragon", "Lizard", "Dinosaur", "Frog"], "correct": 0 },
  { "topic": "Gaming", "question": "In which game do you travel through a “Dark Souls” world?", "answers": ["Dark Souls", "Skyrim", "Witcher 3", "Bloodborne"], "correct": 0 },
  { "topic": "Gaming", "question": "Which company made the game “Overwatch”?", "answers": ["Blizzard", "Valve", "Ubisoft", "EA"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the AI in “Portal”?", "answers": ["GLaDOS", "Cortana", "Wheatley", "HAL 9000"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the character who travels with a red scarf in “Journey”?", "answers": ["The Traveler", "The Wanderer", "The Nomad", "The Hero"], "correct": 0 },
  { "topic": "Gaming", "question": "In which game is “Kratos” the main character?", "answers": ["God of War", "Dante's Inferno", "Devil May Cry", "Assassin's Creed"], "correct": 0 },
  { "topic": "Gaming", "question": "Which game is a huge MMORPG by Blizzard?", "answers": ["World of Warcraft", "Diablo", "StarCraft", "Hearthstone"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the red bird in “Angry Birds”?", "answers": ["Red", "Chuck", "Bomb", "Terence"], "correct": 0 },
  { "topic": "Gaming", "question": "What do you build in “SimCity”?", "answers": ["A city", "A park", "A house", "A farm"], "correct": 0 },
  { "topic": "Gaming", "question": "Who is the pirate villain in “Monkey Island”?", "answers": ["LeChuck", "Guybrush", "Barbossa", "Hook"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the AI in “Halo”?", "answers": ["Cortana", "GLaDOS", "Aria", "Siri"], "correct": 0 },
  { "topic": "Gaming", "question": "Which game is known for its “hardcore” difficulty?", "answers": ["Dark Souls", "FIFA", "Sims", "Pokémon"], "correct": 0 },
  { "topic": "Gaming", "question": "What is the name of the car-soccer game?", "answers": ["Rocket League", "FIFA", "Need for Speed", "Gran Turismo"], "correct": 0 },
  { "topic": "Gaming", "question": "Who is the developer of “Minecraft”?", "answers": ["Mojang", "Valve", "Nintendo", "Epic Games"], "correct": 0 },
  { "category": "Science", "question": "What is the chemical symbol for gold?", "answers": ["Au", "Ag", "Fe", "Gd"], "correct": 0 },
  { "category": "Science", "question": "What is the hardest natural substance on Earth?", "answers": ["Diamond", "Graphite", "Quartz", "Topaz"], "correct": 0 },
  { "category": "Science", "question": "Which planet is known as the 'Red Planet'?", "answers": ["Mars", "Venus", "Jupiter", "Saturn"], "correct": 0 },
  { "category": "Science", "question": "What gas do plants absorb from the atmosphere for photosynthesis?", "answers": ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], "correct": 0 },
  { "category": "Science", "question": "What is the largest planet in our solar system?", "answers": ["Jupiter", "Saturn", "Neptune", "Uranus"], "correct": 0 },
  { "category": "Science", "question": "What is the center of an atom called?", "answers": ["Nucleus", "Proton", "Electron", "Neutron"], "correct": 0 },
  { "category": "Science", "question": "Which force keeps us grounded on Earth?", "answers": ["Gravity", "Magnetism", "Friction", "Inertia"], "correct": 0 },
  { "category": "Science", "question": "What is the boiling point of water in degrees Celsius at sea level?", "answers": ["100°C", "90°C", "110°C", "80°C"], "correct": 0 },
  { "category": "Science", "question": "Which organ is responsible for pumping blood throughout the body?", "answers": ["Heart", "Lungs", "Liver", "Kidneys"], "correct": 0 },
  { "category": "Science", "question": "What is the chemical formula for water?", "answers": ["H2O", "CO2", "O2", "H2O2"], "correct": 0 },
  { "category": "Science", "question": "Which scientist is famous for the theory of general relativity?", "answers": ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Stephen Hawking"], "correct": 0 },
  { "category": "Science", "question": "What is the closest star to Earth?", "answers": ["The Sun", "Proxima Centauri", "Sirius", "Betelgeuse"], "correct": 0 },
  { "category": "Science", "question": "Which gas makes up the majority of Earth's atmosphere?", "answers": ["Nitrogen", "Oxygen", "Argon", "Carbon dioxide"], "correct": 0 },
  { "category": "Science", "question": "What are the three states of matter?", "answers": ["Solid, liquid, and gas", "Solid, plasma, and gas", "Liquid, gas, and energy", "Solid, liquid, and mass"], "correct": 0 },
  { "category": "Science", "question": "What is the process by which plants make their own food?", "answers": ["Photosynthesis", "Respiration", "Digestion", "Fermentation"], "correct": 0 },
  { "category": "Science", "question": "Which part of the human brain controls balance?", "answers": ["Cerebellum", "Cerebrum", "Brainstem", "Thalamus"], "correct": 0 },
  { "category": "Science", "question": "What is the study of living organisms called?", "answers": ["Biology", "Chemistry", "Physics", "Botany"], "correct": 0 },
  { "category": "Science", "question": "Which element has the atomic number 1?", "answers": ["Hydrogen", "Helium", "Oxygen", "Carbon"], "correct": 0 },
  { "category": "Science", "question": "What is the name of the galaxy that contains our Solar System?", "answers": ["The Milky Way", "Andromeda", "Triangulum", "Sombrero"], "correct": 0 },
  { "category": "Science", "question": "Which metal is liquid at room temperature?", "answers": ["Mercury", "Gallium", "Lead", "Iron"], "correct": 0 },
  { "category": "Science", "question": "What is the speed of light in a vacuum, approximately?", "answers": ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "30,000 km/s"], "correct": 0 },
  { "category": "Science", "question": "What is the hardest bone in the human body?", "answers": ["Femur", "Skull", "Tibia", "Humerus"], "correct": 0 },
  { "category": "Science", "question": "Which vitamin is primarily obtained from sunlight?", "answers": ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B12"], "correct": 0 },
  { "category": "Science", "question": "What is the study of rocks and the Earth's crust called?", "answers": ["Geology", "Geography", "Meteorology", "Paleontology"], "correct": 0 },
  { "category": "Science", "question": "Which blood type is known as the universal donor?", "answers": ["O negative", "AB positive", "A positive", "B negative"], "correct": 0 },
  { "category": "Science", "question": "What does DNA stand for?", "answers": ["Deoxyribonucleic acid", "Dioxyribonucleic acid", "Deoxyribose nucleic acid", "Data nucleic acid"], "correct": 0 },
  { "category": "Science", "question": "Which planet has the most visible rings?", "answers": ["Saturn", "Jupiter", "Uranus", "Neptune"], "correct": 0 },
  { "category": "Science", "question": "What is the main gas that stars are composed of?", "answers": ["Hydrogen", "Helium", "Oxygen", "Nitrogen"], "correct": 0 },
  { "category": "Science", "question": "Which unit is used to measure electric current?", "answers": ["Ampere", "Volt", "Watt", "Ohm"], "correct": 0 },
  { "category": "Science", "question": "What is the smallest unit of matter?", "answers": ["Atom", "Molecule", "Cell", "Proton"], "correct": 0 },
  { "category": "Science", "question": "What process do cells use to divide and multiply?", "answers": ["Mitosis", "Photosynthesis", "Osmosis", "Diffusion"], "correct": 0 },
  { "category": "Science", "question": "Which acid is found in lemons?", "answers": ["Citric acid", "Acetic acid", "Sulfuric acid", "Hydrochloric acid"], "correct": 0 },
  { "category": "Science", "question": "What is the study of outer space called?", "answers": ["Astronomy", "Astrology", "Cosmology", "Astrobiology"], "correct": 0 },
  { "category": "Science", "question": "Which planet is closest to the Sun?", "answers": ["Mercury", "Venus", "Earth", "Mars"], "correct": 0 },
  { "category": "Science", "question": "What type of energy is stored in a battery?", "answers": ["Chemical energy", "Kinetic energy", "Thermal energy", "Nuclear energy"], "correct": 0 },
  { "category": "Science", "question": "What is the name of the phenomenon where light bends when entering a new medium?", "answers": ["Refraction", "Reflection", "Diffraction", "Absorption"], "correct": 0 },
  { "category": "Science", "question": "Which human organ is responsible for filtering blood?", "answers": ["Kidneys", "Liver", "Spleen", "Pancreas"], "correct": 0 },
  { "category": "Science", "question": "What is the most abundant element in the universe?", "answers": ["Hydrogen", "Helium", "Oxygen", "Carbon"], "correct": 0 },
  { "category": "Science", "question": "What is the term for an animal that eats only plants?", "answers": ["Herbivore", "Carnivore", "Omnivore", "Detritivore"], "correct": 0 },
  { "category": "Science", "question": "Which scale is used to measure the acidity or alkalinity of a solution?", "answers": ["pH scale", "Richter scale", "Kelvin scale", "Celsius scale"], "correct": 0 },
  { "category": "Science", "question": "What is the name of the first artificial satellite launched into space?", "answers": ["Sputnik 1", "Explorer 1", "Apollo 11", "Voyager 1"], "correct": 0 },
  { "category": "Science", "question": "Which planet is famous for its 'Great Red Spot'?", "answers": ["Jupiter", "Mars", "Saturn", "Venus"], "correct": 0 },
  { "category": "Science", "question": "What is the primary function of white blood cells?", "answers": ["Immune defense", "Oxygen transport", "Clotting", "Energy storage"], "correct": 0 },
  { "category": "Science", "question": "Which law states that for every action, there is an equal and opposite reaction?", "answers": ["Newton's Third Law of Motion", "Newton's First Law", "Newton's Second Law", "Law of Gravity"], "correct": 0 },
  { "category": "Science", "question": "What is the coldest layer of the Earth's atmosphere?", "answers": ["Mesosphere", "Troposphere", "Stratosphere", "Thermosphere"], "correct": 0 },
  { "category": "Science", "question": "Which chemical element is named after the sun?", "answers": ["Helium", "Hydrogen", "Mercury", "Neon"], "correct": 0 },
  { "category": "Science", "question": "What type of animal is a whale?", "answers": ["Mammal", "Fish", "Reptile", "Amphibian"], "correct": 0 },
  { "category": "Geographic", "question": "What is the highest waterfall in the world?", "answers": ["Angel Falls", "Niagara Falls", "Victoria Falls", "Iguazu Falls"], "correct": 0 },
  { "category": "Geographic", "question": "What is the largest country in the world by land area?", "answers": ["Russia", "Canada", "China", "USA"], "correct": 0 },
  { "category": "Geographic", "question": "Which city is built on seven hills?", "answers": ["Rome", "Athens", "Istanbul", "Lisbon"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Argentina?", "answers": ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"], "correct": 0 },
  { "category": "Geographic", "question": "Which sea is the saltiest and lowest point on land?", "answers": ["Dead Sea", "Red Sea", "Caspian Sea", "Black Sea"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Mexico?", "answers": ["Mexico City", "Guadalajara", "Monterrey", "Cancun"], "correct": 0 },
  { "category": "Geographic", "question": "Which country is known as the 'Land of Fire and Ice'?", "answers": ["Iceland", "Norway", "Greenland", "New Zealand"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Thailand?", "answers": ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"], "correct": 0 },
  { "category": "Geographic", "question": "Which river flows through London?", "answers": ["Thames", "Seine", "Rhine", "Danube"], "correct": 0 },
  { "category": "Geographic", "question": "What is the largest island in the world?", "answers": ["Greenland", "New Guinea", "Borneo", "Madagascar"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Canada?", "answers": ["Ottawa", "Toronto", "Vancouver", "Montreal"], "correct": 0 },
  { "category": "Geographic", "question": "Which mountain is the tallest in the world above sea level?", "answers": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], "correct": 0 },
  { "category": "Geographic", "question": "What is the smallest country in the world?", "answers": ["Vatican City", "Monaco", "San Marino", "Liechtenstein"], "correct": 0 },
  { "category": "Geographic", "question": "Which ocean is the largest on Earth?", "answers": ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Australia?", "answers": ["Canberra", "Sydney", "Melbourne", "Brisbane"], "correct": 0 },
  { "category": "Geographic", "question": "Which desert is the largest hot desert in the world?", "answers": ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Japan?", "answers": ["Tokyo", "Kyoto", "Osaka", "Yokohama"], "correct": 0 },
  { "category": "Geographic", "question": "Which river is the longest in the world?", "answers": ["Nile River", "Amazon River", "Yangtze River", "Mississippi River"], "correct": 0 },
  { "category": "Geographic", "question": "What country has the most natural lakes?", "answers": ["Canada", "Russia", "USA", "Brazil"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Brazil?", "answers": ["Brasilia", "Rio de Janeiro", "Sao Paulo", "Salvador"], "correct": 0 },
  { "category": "Geographic", "question": "Which continent is the driest on Earth?", "answers": ["Antarctica", "Australia", "Africa", "Asia"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Italy?", "answers": ["Rome", "Milan", "Florence", "Venice"], "correct": 0 },
  { "category": "Geographic", "question": "Which country is both in Europe and Asia?", "answers": ["Turkey or Russia", "Egypt", "Greece", "Kazakhstan"], "correct": 0 },
  { "category": "Geographic", "question": "What is the longest mountain range in the world?", "answers": ["Andes", "Rockies", "Himalayas", "Alps"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of South Africa?", "answers": ["Pretoria, Cape Town, and Bloemfontein", "Johannesburg", "Durban", "Port Elizabeth"], "correct": 0 },
  { "category": "Geographic", "question": "Which European country is known for its fjords?", "answers": ["Norway", "Sweden", "Finland", "Denmark"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Germany?", "answers": ["Berlin", "Munich", "Frankfurt", "Hamburg"], "correct": 0 },
  { "category": "Geographic", "question": "Which US state is the largest by land area?", "answers": ["Alaska", "Texas", "California", "Montana"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of India?", "answers": ["New Delhi", "Mumbai", "Kolkata", "Bangalore"], "correct": 0 },
  { "category": "Geographic", "question": "Which African country has the largest population?", "answers": ["Nigeria", "Ethiopia", "Egypt", "DR Congo"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of France?", "answers": ["Paris", "Lyon", "Marseille", "Nice"], "correct": 0 },
  { "category": "Geographic", "question": "Which sea is located between Europe and Africa?", "answers": ["Mediterranean Sea", "Red Sea", "Caribbean Sea", "Baltic Sea"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Egypt?", "answers": ["Cairo", "Alexandria", "Giza", "Luxor"], "correct": 0 },
  { "category": "Geographic", "question": "Which country is known as the 'Land of the Rising Sun'?", "answers": ["Japan", "China", "South Korea", "Thailand"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Spain?", "answers": ["Madrid", "Barcelona", "Valencia", "Seville"], "correct": 0 },
  { "category": "Geographic", "question": "Which canal connects the Atlantic and Pacific Oceans?", "answers": ["Panama Canal", "Suez Canal", "Erie Canal", "Kiel Canal"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of the United Kingdom?", "answers": ["London", "Edinburgh", "Cardiff", "Belfast"], "correct": 0 },
  { "category": "Geographic", "question": "Which country borders Germany to the west?", "answers": ["France", "Poland", "Austria", "Czech Republic"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Russia?", "answers": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"], "correct": 0 },
  { "category": "Geographic", "question": "Which island is the largest in the Mediterranean Sea?", "answers": ["Sicily", "Sardinia", "Cyprus", "Corsica"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of Greece?", "answers": ["Athens", "Thessaloniki", "Patras", "Heraklion"], "correct": 0 },
  { "category": "Geographic", "question": "Which island nation is located southeast of India?", "answers": ["Sri Lanka", "Maldives", "Mauritius", "Seychelles"], "correct": 0 },
  { "category": "Geographic", "question": "What is the capital of New Zealand?", "answers": ["Wellington", "Auckland", "Christchurch", "Queenstown"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who directed the 1993 dinosaur blockbuster Jurassic Park?", "answers": ["Steven Spielberg", "George Lucas", "James Cameron", "Ridley Scott"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the wizarding school in the Harry Potter series?", "answers": ["Hogwarts", "Durmstrang", "Beaubatons", "Ilvermorny"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which actor played Iron Man in the Marvel Cinematic Universe?", "answers": ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the highest-grossing film of all time worldwide?", "answers": ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which series features the fictional continents of Westeros and Essos?", "answers": ["Game of Thrones", "The Witcher", "The Lord of the Rings", "Wheel of Time"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who played Jack Dawson in the 1997 film Titanic?", "answers": ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the fictional town where Stranger Things is set?", "answers": ["Hawkins", "Riverdale", "Sunnydale", "Mystic Falls"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features a dystopian theme park populated by cloned dinosaurs?", "answers": ["Jurassic Park", "Westworld", "The Hunger Games", "The Maze Runner"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who is the main protagonist of the Breaking Bad series?", "answers": ["Walter White", "Jesse Pinkman", "Saul Goodman", "Hank Schrader"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which animated movie features a young musician named Miguel who travels to the Land of the Dead?", "answers": ["Coco", "Moana", "Soul", "Encanto"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the kingdom where Elsa and Anna live in Frozen?", "answers": ["Arendelle", "Corona", "DunBroch", "Agrabah"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which sitcom features characters named Ross, Rachel, Monica, Chandler, Joey, and Phoebe?", "answers": ["Friends", "How I Met Your Mother", "The Big Bang Theory", "Modern Family"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who directed the dark knight trilogy?", "answers": ["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Steven Spielberg"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie won the Oscar for Best Picture in 2020, becoming the first non-English language film to do so?", "answers": ["Parasite", "1917", "Once Upon a Time in Hollywood", "Joker"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the AI villain in The Matrix?", "answers": ["Agent Smith", "The Architect", "The Oracle", "Morpheus"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which actor portrayed the Joker in the 2008 film The Dark Knight?", "answers": ["Heath Ledger", "Joaquin Phoenix", "Jack Nicholson", "Jared Leto"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the coffee shop where the characters in Friends frequently hang out?", "answers": ["Central Perk", "Monk's Cafe", "Luke's Diner", "MacLaren's Pub"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which film features a giant gorilla that climbs the Empire State Building?", "answers": ["King Kong", "Godzilla", "Mighty Joe Young", "Tarzan"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who is the main villain in the original Star Wars trilogy?", "answers": ["Darth Vader", "Emperor Palpatine", "Kylo Ren", "Darth Maul"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which television series follows the lives of regional office employees in Scranton, Pennsylvania?", "answers": ["The Office", "Parks and Recreation", "Brooklyn Nine-Nine", "Superstore"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the fictional superhero team that includes Captain America and Thor?", "answers": ["The Avengers", "The Justice League", "The X-Men", "The Guardians of the Galaxy"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features a young boy named Kevin who is accidentally left home alone for Christmas?", "answers": ["Home Alone", "Elf", "The Grinch", "The Polar Express"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who directed the epic fantasy trilogy The Lord of the Rings?", "answers": ["Peter Jackson", "George Lucas", "Steven Spielberg", "Guillermo del Toro"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which TV series features a high school chemistry teacher who turns to manufacturing methamphetamine?", "answers": ["Breaking Bad", "Better Call Saul", "Ozark", "Weeds"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the island where Jurassic Park was built?", "answers": ["Isla Nublar", "Isla Sorna", "Isla de Muerta", "Isla Cruces"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which film features a character named Forrest Gump who famously says, 'Life is like a box of chocolates'?", "answers": ["Forrest Gump", "The Green Mile", "Cast Away", "Saving Private Ryan"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the multi-generational crime family in The Godfather?", "answers": ["Corleone", "Soprano", "Lannister", "Shelby"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which Disney movie features a young lion prince named Simba?", "answers": ["The Lion King", "Aladdin", "Tarzan", "The Jungle Book"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who played Wolverine in the X-Men film series?", "answers": ["Hugh Jackman", "Ryan Reynolds", "Christian Bale", "Robert Downey Jr."], "correct": 0 },
  { "category": "Movies and Series", "question": "Which dystopian sci-fi film features characters named Neo, Trinity, and Morpheus?", "answers": ["The Matrix", "Blade Runner", "Interstellar", "Inception"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the fictional country where Black Panther is set?", "answers": ["Wakanda", "Zamunda", "Latveria", "Genosha"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features a giant shark terrorizing a New England beach town?", "answers": ["Jaws", "The Meg", "Deep Blue Sea", "Sharknado"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who played the character Captain Jack Sparrow in the Pirates of the Caribbean series?", "answers": ["Johnny Depp", "Brad Pitt", "Orlando Bloom", "Tom Cruise"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which television series features a family of yellow-skinned characters living in Springfield?", "answers": ["The Simpsons", "Family Guy", "South Park", "Futurama"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the title of the first movie in the Star Wars franchise released in 1977?", "answers": ["A New Hope", "The Empire Strikes Back", "The Phantom Menace", "The Force Awakens"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features a group of toys that come to life when humans aren't around?", "answers": ["Toy Story", "Small Soldiers", "The Lego Movie", "Wreck-It Ralph"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who played the main character in the movie John Wick?", "answers": ["Keanu Reeves", "Tom Cruise", "Liam Neeson", "Bruce Willis"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which television show features a mysterious island where a plane crash survivors must learn to coexist?", "answers": ["Lost", "Survivor", "The 100", "Manifest"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the fictional school for gifted youngsters in X-Men?", "answers": ["Xavier's School for Gifted Youngsters", "Hogwarts", "Sky High", "Starfleet Academy"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features a romantic relationship between a human girl named Bella and a vampire named Edward?", "answers": ["Twilight", "The Vampire Diaries", "True Blood", "Underworld"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who directed the 1994 film Pulp Fiction?", "answers": ["Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "David Fincher"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the virtual reality world in Ready Player One?", "answers": ["The OASIS", "The Matrix", "The Grid", "The Metaverse"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which TV series features a group of ad executives on Madison Avenue in the 1960s?", "answers": ["Mad Men", "Suits", "Billions", "House of Cards"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the name of the primary setting for the horror series American Horror Story Season 1?", "answers": ["Murder House", "Asylum", "Coven", "Freak Show"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features an older man who flies his house to South America using balloons?", "answers": ["Up", "Wall-E", "Inside Out", "Ratatouille"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who played the character Neo in The Matrix?", "answers": ["Keanu Reeves", "Laurence Fishburne", "Hugo Weaving", "Matt Damon"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which series follows the political schemes of Frank Underwood in Washington D.C.?", "answers": ["House of Cards", "The West Wing", "Scandal", "Veep"], "correct": 0 },
  { "category": "Movies and Series", "question": "What is the title of the 2023 movie about the creator of the atomic bomb?", "answers": ["Oppenheimer", "Barbie", "Dunkirk", "Interstellar"], "correct": 0 },
  { "category": "Movies and Series", "question": "Which movie features a green ogre who goes on a quest to rescue a princess?", "answers": ["Shrek", "Monsters, Inc.", "Madagascar", "Ice Age"], "correct": 0 },
  { "category": "Movies and Series", "question": "Who played Hermione Granger in the Harry Potter films?", "answers": ["Emma Watson", "Emma Stone", "Saoirse Ronan", "Jennifer Lawrence"], "correct": 0 },
  { "category": "Sports", "question": "How many players are on the field for one team in a soccer match?", "answers": ["11", "10", "12", "9"], "correct": 0 },
  { "category": "Sports", "question": "Which country won the first-ever FIFA World Cup in 1930?", "answers": ["Uruguay", "Argentina", "Brazil", "Italy"], "correct": 0 },
  { "category": "Sports", "question": "What color is the jersey worn by the leader of the Tour de France?", "answers": ["Yellow", "Pink", "Red", "Green"], "correct": 0 },
  { "category": "Sports", "question": "In swimming, what is the fastest stroke?", "answers": ["Freestyle", "Breaststroke", "Backstroke", "Butterfly"], "correct": 0 },
  { "category": "Sports", "question": "How many players are on the ice for one team in a standard hockey game?", "answers": ["6", "5", "7", "4"], "correct": 0 },
  { "category": "Sports", "question": "Which sport uses a 'shuttlecock'?", "answers": ["Badminton", "Tennis", "Table Tennis", "Squash"], "correct": 0 },
  { "category": "Sports", "question": "Who is often considered the fastest man in history, holding the 100m world record?", "answers": ["Usain Bolt", "Tyson Gay", "Yohan Blake", "Asafa Powell"], "correct": 0 },
  { "category": "Sports", "question": "In bowling, what is the term for scoring three consecutive strikes?", "answers": ["Turkey", "Chicken", "Ham", "Deer"], "correct": 0 },
  { "category": "Sports", "question": "Which country is famous for the martial art Taekwondo?", "answers": ["South Korea", "Japan", "China", "Thailand"], "correct": 0 },
  { "category": "Sports", "question": "How long is a standard marathon race in miles?", "answers": ["26.2 miles", "24.2 miles", "28.2 miles", "22.2 miles"], "correct": 0 },
  { "category": "Sports", "question": "Which tennis tournament is played on grass courts?", "answers": ["Wimbledon", "French Open", "US Open", "Australian Open"], "correct": 0 },
  { "category": "Sports", "question": "In baseball, how many outs are in a standard inning for one team?", "answers": ["3", "4", "2", "6"], "correct": 0 },
  { "category": "Sports", "question": "Which country hosts the famous annual 24 Hours of Le Mans auto race?", "answers": ["France", "Italy", "Germany", "Belgium"], "correct": 0 },
  { "category": "Sports", "question": "What is the maximum score possible in a single game of 10-pin bowling?", "answers": ["300", "200", "400", "250"], "correct": 0 },
  { "category": "Sports", "question": "Which golf tournament awards its winner a green jacket?", "answers": ["The Masters", "The Open Championship", "US Open", "PGA Championship"], "correct": 0 },
  { "category": "Sports", "question": "In rugby union, how many points is a try worth?", "answers": ["5", "3", "4", "6"], "correct": 0 },
  { "category": "Sports", "question": "Which country has won the most FIFA World Cups?", "answers": ["Brazil", "Germany", "Italy", "Argentina"], "correct": 0 },
  { "category": "Sports", "question": "What is the term used in tennis when the score is tied at 40-40?", "answers": ["Deuce", "Love", "Advantage", "Break"], "correct": 0 },
  { "category": "Sports", "question": "Which city hosted the 2012 Summer Olympic Games?", "answers": ["London", "Beijing", "Rio de Janeiro", "Tokyo"], "correct": 0 },
  { "category": "Sports", "question": "In basketball, how many seconds does a team have to shoot the ball before a shot clock violation?", "answers": ["24", "30", "14", "20"], "correct": 0 },
  { "category": "Sports", "question": "Which formula 1 driver holds the record for the most career race wins?", "answers": ["Lewis Hamilton", "Michael Schumacher", "Ayrton Senna", "Sebastian Vettel"], "correct": 0 },
  { "category": "Sports", "question": "What is the name of the championship trophy awarded annually in the NFL?", "answers": ["Vince Lombardi Trophy", "Stanley Cup", "Larry O'Brien Trophy", "Commissioner's Trophy"], "correct": 0 },
  { "category": "Sports", "question": "In gymnastics, what is the highest score traditionally possible under the old scoring system?", "answers": ["10", "100", "20", "5"], "correct": 0 },
  { "category": "Sports", "question": "Which sport uses terms like 'checkmate', 'gambit', and 'castling'?", "answers": ["Chess", "Backgammon", "Bridge", "Fencing"], "correct": 0 },
  { "category": "Sports", "question": "How many rings are on the official Olympic flag?", "answers": ["5", "6", "4", "7"], "correct": 0 },
  { "category": "Sports", "question": "Which country is famous for the sport of cricket and won the 2019 Cricket World Cup?", "answers": ["England", "Australia", "India", "South Africa"], "correct": 0 },
  { "category": "Sports", "question": "In horse racing, what is the triple crown race held in Kentucky?", "answers": ["Kentucky Derby", "Preakness Stakes", "Belmont Stakes", "Breeders' Cup"], "correct": 0 },
  { "category": "Sports", "question": "Which city is home to the NBA team called the Celtics?", "answers": ["Boston", "New York", "Chicago", "Los Angeles"], "correct": 0 },
  { "category": "Sports", "question": "In ice hockey, what is the puck made of?", "answers": ["Vulcanized rubber", "Plastic", "Wood", "Metal"], "correct": 0 },
  { "category": "Sports", "question": "Which female tennis player has won the most Grand Slam singles titles in the Open Era?", "answers": ["Serena Williams", "Steffi Graf", "Martina Navratilova", "Chris Evert"], "correct": 0 },
  { "category": "Sports", "question": "What is the standard length of an Olympic-sized swimming pool in meters?", "answers": ["50 meters", "25 meters", "100 meters", "75 meters"], "correct": 0 },
  { "category": "Sports", "question": "In what sport do teams compete for the Stanley Cup?", "answers": ["Ice Hockey", "Field Hockey", "Lacrosse", "Curling"], "correct": 0 },
  { "category": "Sports", "question": "Which country hosted the 2022 winter Olympic games?", "answers": ["China", "South Korea", "Japan", "Russia"], "correct": 0 },
  { "category": "Sports", "question": "In American football, how many points is a touchdown worth?", "answers": ["6", "3", "7", "1"], "correct": 0 },
  { "category": "Sports", "question": "Which boxer was known as 'The Greatest' and 'The Louisville Lip'?", "answers": ["Muhammad Ali", "Mike Tyson", "Joe Frazier", "Sugar Ray Leonard"], "correct": 0 },
  { "category": "Sports", "question": "In cycling, what is a group of riders called?", "answers": ["Peloton", "Paceline", "Breakaway", "Echelon"], "correct": 0 },
  { "category": "Sports", "question": "Which city hosted the first modern Olympic games in 1896?", "answers": ["Athens", "Paris", "London", "Rome"], "correct": 0 },
  { "category": "Sports", "question": "In water polo, how many players from one team are in the water at once?", "answers": ["7", "6", "8", "5"], "correct": 0 },
  { "category": "Sports", "question": "Which golf tournament is played annually at the Augusta National Golf Club?", "answers": ["The Masters", "US Open", "PGA Championship", "The Open"], "correct": 0 },
  { "category": "Sports", "question": "In what year did the Premier League begin?", "answers": ["1992", "1990", "1995", "1988"], "correct": 0 },
  { "category": "Sports", "question": "Which country won the UEFA Euro 2020 tournament (played in 2021)?", "answers": ["Italy", "England", "Spain", "Denmark"], "correct": 0 },
  { "category": "Sports", "question": "In darts, what is the highest possible score with a single dart?", "answers": ["60", "50", "30", "100"], "correct": 0 },
  { "category": "Sports", "question": "Which city is home to the baseball team called the Yankees?", "answers": ["New York", "Boston", "Chicago", "Los Angeles"], "correct": 0 },
  { "category": "Sports", "question": "In what country did the sport of curling originate?", "answers": ["Scotland", "Canada", "Norway", "Sweden"], "correct": 0 },
  { "category": "Sports", "question": "Which country won the most gold medals at the 2020 Tokyo Olympics?", "answers": ["USA", "China", "Japan", "Great Britain"], "correct": 0 },
  { "category": "Sports", "question": "In mixed martial arts, what does UFC stand for?", "answers": ["Ultimate Fighting Championship", "Universal Fighting Cup", "United Fighters League", "Ultimate Fight Circuit"], "correct": 0 },
  { "category": "Sports", "question": "Which country is famous for producing the running legend Eliud Kipchoge?", "answers": ["Kenya", "Ethiopia", "Uganda", "Jamaica"], "correct": 0 },
  { "category": "Sports", "question": "In track and field, how many hurdles are in a standard 110m hurdle race?", "answers": ["10", "8", "12", "9"], "correct": 0 },
  { "category": "Sports", "question": "Which city is home to the football club Real Madrid?", "answers": ["Madrid", "Barcelona", "Valencia", "Seville"], "correct": 0 },
  { "category": "Sports", "question": "In what sport is the term 'slap shot' used?", "answers": ["Ice Hockey", "Field Hockey", "Lacrosse", "Tennis"], "correct": 0 },
  { "category": "Animals", "question": "What is the largest mammal in the world?", "answers": ["Blue whale", "African elephant", "Fin whale", "Sperm whale"], "correct": 0 },
  { "category": "Animals", "question": "Which bird is known for its ability to mimic human speech?", "answers": ["Parrot", "Crow", "Mynah", "Raven"], "correct": 0 },
  { "category": "Animals", "question": "How many legs does a spider have?", "answers": ["8", "6", "10", "12"], "correct": 0 },
  { "category": "Animals", "question": "What is the fastest land animal?", "answers": ["Cheetah", "Pronghorn", "Springbok", "Lion"], "correct": 0 },
  { "category": "Animals", "question": "Which animal is known as the 'King of the Jungle'?", "answers": ["Lion", "Tiger", "Leopard", "Jaguar"], "correct": 0 },
  { "category": "Animals", "question": "What is a group of lions called?", "answers": ["Pride", "Pack", "Herd", "Flock"], "correct": 0 },
  { "category": "Animals", "question": "Which mammal is capable of true flight?", "answers": ["Bat", "Flying squirrel", "Sugar glider", "Flying lemur"], "correct": 0 },
  { "category": "Animals", "question": "What is the solo land mammal native to Antarctica?", "answers": ["None", "Polar bear", "Arctic fox", "Penguin"], "correct": 0 },
  { "category": "Animals", "question": "How many hearts does an octopus have?", "answers": ["3", "1", "2", "4"], "correct": 0 },
  { "category": "Animals", "question": "What is the tallest land animal?", "answers": ["Giraffe", "Elephant", "Ostrich", "Moose"], "correct": 0 },
  { "category": "Animals", "question": "Which land mammal has the longest gestation period?", "answers": ["Elephant", "Rhino", "Giraffe", "Whale"], "correct": 0 },
  { "category": "Animals", "question": "What is the only bird that can fly backward?", "answers": ["Hummingbird", "Kingfisher", "Swallow", "Swift"], "correct": 0 },
  { "category": "Animals", "question": "What type of animal is a komodo dragon?", "answers": ["Lizard", "Snake", "Crocodile", "Alligator"], "correct": 0 },
  { "category": "Animals", "question": "Which animal has the strongest bite force relative to its size?", "answers": ["Tasmanian devil", "Crocodile", "Hippo", "Hyena"], "correct": 0 },
  { "category": "Animals", "question": "What is a group of crows called?", "answers": ["Murder", "Flock", "Pack", "Crowd"], "correct": 0 },
  { "category": "Animals", "question": "Which aquatic animal is known for sleeping with one eye open?", "answers": ["Dolphin", "Shark", "Whale", "Seal"], "correct": 0 },
  { "category": "Animals", "question": "What is the largest species of big cat?", "answers": ["Tiger", "Lion", "Jaguar", "Leopard"], "correct": 0 },
  { "category": "Animals", "question": "How many compartments does a cow's stomach have?", "answers": ["4", "3", "2", "1"], "correct": 0 },
  { "category": "Animals", "question": "Which bird lays the largest egg relative to its body size?", "answers": ["Kiwi", "Ostrich", "Emu", "Hummingbird"], "correct": 0 },
  { "category": "Animals", "question": "What is the primary food source for giant pandas?", "answers": ["Bamboo", "Eucalyptus", "Insects", "Fish"], "correct": 0 },
  { "category": "Animals", "question": "Which reptile is known for its ability to change color?", "answers": ["Chameleon", "Iguana", "Gecko", "Anole"], "correct": 0 },
  { "category": "Animals", "question": "What is the smallest species of mammal in the world?", "answers": ["Bumblebee bat", "Etruscan shrew", "Least weasel", "Mouse lemur"], "correct": 0 },
  { "category": "Animals", "question": "Which animal uses echolocation to navigate?", "answers": ["Bat or Dolphin", "Lion", "Eagle", "Snake"], "correct": 0 },
  { "category": "Animals", "question": "How far can a wolf smell its prey?", "answers": ["Nearly two miles", "Half a mile", "Five miles", "One mile"], "correct": 0 },
  { "category": "Animals", "question": "What is the study of birds called?", "answers": ["Ornithology", "Zoology", "Biology", "Avian studies"], "correct": 0 },
  { "category": "Animals", "question": "Which animal is known for playing dead?", "answers": ["Opossum", "Hedgehog", "Fox", "Skunk"], "correct": 0 },
  { "category": "Mythology", "question": "Who is the king of the gods in Greek mythology?", "answers": ["Zeus", "Poseidon", "Hades", "Ares"], "correct": 0 },
  { "category": "Mythology", "question": "What is the home of the Norse gods called?", "answers": ["Asgard", "Midgard", "Valhalla", "Jotunheim"], "correct": 0 },
  { "category": "Mythology", "question": "In Egyptian mythology, who is the god of the afterlife and mummification?", "answers": ["Anubis", "Osiris", "Ra", "Horus"], "correct": 0 },
  { "category": "Mythology", "question": "Which mythical creature rises from its own ashes?", "answers": ["Phoenix", "Griffin", "Dragon", "Pegasus"], "correct": 0 },
  { "category": "Mythology", "question": "Who is the Roman equivalent of the Greek goddess Aphrodite?", "answers": ["Venus", "Juno", "Minerva", "Diana"], "correct": 0 },
  { "category": "Mythology", "question": "What weapon is wielded by the Norse god Thor?", "answers": ["Mjolnir", "Gungnir", "Excalibur", "Trident"], "correct": 0 },
  { "category": "Mythology", "question": "In Greek mythology, who flew too close to the sun?", "answers": ["Icarus", "Daedalus", "Perseus", "Achilles"], "correct": 0 },
  { "category": "Mythology", "question": "Which Norse god lost his eye in exchange for wisdom?", "answers": ["Odin", "Thor", "Loki", "Tyr"], "correct": 0 },
  { "category": "Mythology", "question": "What is the name of the Greek goddess of wisdom?", "answers": ["Athena", "Hera", "Aphrodite", "Artemis"], "correct": 0 },
  { "category": "Mythology", "question": "Who is the Roman counterpart to the Greek god Poseidon?", "answers": ["Neptune", "Jupiter", "Mars", "Pluto"], "correct": 0 },
  { "category": "Mythology", "question": "Which creature is half-man and half-bull?", "answers": ["Minotaur", "Centaur", "Satyr", "Chimera"], "correct": 0 },
  { "category": "Mythology", "question": "What is the Norse 'world tree' that connects the nine realms?", "answers": ["Yggdrasil", "Asgard", "Ragnarok", "Valhalla"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"I'm standardly in love with your _______.\"", "answers": ["Body", "Smile", "Eyes", "Voice"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Don't stop _______, hold on to that feeling.\"", "answers": ["Believin'", "Dreaming", "Thinking", "Loving"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Is this the real life? Is this just _______?\"", "answers": ["Fantasy", "Reality", "Illusion", "A dream"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"I'm gonna be standardly a _______, baby.\"", "answers": ["Teddy bear", "Lover", "Hero", "Angel"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Cause baby, you're a _______.\"", "answers": ["Firework", "Star", "Dream", "Queen"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"I'm gonna take my horse to the Old Town _______.\"", "answers": ["Road", "Street", "Path", "Way"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"It's a beautiful day, don't let it get _______.\"", "answers": ["Away", "Dark", "Cold", "Lost"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Wake me up when September _______.\"", "answers": ["Ends", "Leaves", "Dies", "Falls"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"I've got a pocket, got a pocketful of _______.\"", "answers": ["Sunshine", "Gold", "Dreams", "Love"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Strumming my pain with his fingers, singing my life with his _______.\"", "answers": ["Words", "Songs", "Voice", "Music"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"I'm walking on sunshine, whoa! And don't it feel _______!\"", "answers": ["Good", "Great", "Right", "Free"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Under the boardwalk, down by the sea, _______.\"", "answers": ["On a blanket with my baby is where I'll be", "Walking with you", "Watching the waves", "Feeling so free"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Another one bites the _______.\"", "answers": ["Dust", "Ground", "Air", "Earth"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"Working 9 to 5, what a way to make a _______.\"", "answers": ["Living", "Fortune", "Life", "Change"], "correct": 0 },
  { "category": "Finish Lyrics", "question": "\"She's a material _______.\"", "answers": ["Girl", "Woman", "Lady", "Queen"], "correct": 0 },
  { "category": "Literatur", "question": "What is the name of the fictional country in The Hunger Games?", "answers": ["Panem", "Capitol", "District 12", "Airstrip One"], "correct": 0 },
  { "category": "Literatur", "question": "Which author created the famous detective Sherlock Holmes?", "answers": ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "Wilkie Collins"], "correct": 0 },
  { "category": "Literatur", "question": "What is the title of the first book in the Lord of the Rings trilogy?", "answers": ["The Fellowship of the Ring", "The Two Towers", "The Return of the King", "The Hobbit"], "correct": 0 },
  { "category": "Literatur", "question": "Who wrote The Catcher in the Rye?", "answers": ["J.D. Salinger", "F. Scott Fitzgerald", "John Steinbeck", "Ernest Hemingway"], "correct": 0 },
  { "category": "Literatur", "question": "Which literary work is set in the fictional town of Macondo?", "answers": ["One Hundred Years of Solitude", "Love in the Time of Cholera", "Chronicle of a Death Foretold", "The House of the Spirits"], "correct": 0 },
  { "category": "Literatur", "question": "In To Kill a Mockingbird, what is the name of the lawyer who defends Tom Robinson?", "answers": ["Atticus Finch", "Boo Radley", "Bob Ewell", "Scout Finch"], "correct": 0 },
  { "category": "Literatur", "question": "Who wrote Frankenstein; or, The Modern Prometheus?", "answers": ["Mary Shelley", "Bram Stoker", "Lord Byron", "Percy Bysshe Shelley"], "correct": 0 },
  { "category": "Literatur", "question": "In A Tale of Two Cities, what are the two cities?", "answers": ["London and Paris", "New York and London", "Paris and Rome", "London and Berlin"], "correct": 0 },
  { "category": "Literatur", "question": "Which literary device uses an object to represent an abstract idea?", "answers": ["Symbolism", "Metaphor", "Allegory", "Personification"], "correct": 0 },
  { "category": "Literatur", "question": "Who wrote Brave New World?", "answers": ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], "correct": 0 },
  { "category": "Literatur", "question": "What is the name of the whale in Moby-Dick?", "answers": ["Moby Dick", "Monstro", "Shamu", "Jonah"], "correct": 0 },
  { "category": "Literatur", "question": "Which Russian author wrote Crime and Punishment?", "answers": ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"], "correct": 0 },
  { "category": "Literatur", "question": "In The Great Gatsby, where does Jay Gatsby live?", "answers": ["West Egg", "East Egg", "Manhattan", "Brooklyn"], "correct": 0 },
  { "category": "Literatur", "question": "Who wrote The Raven?", "answers": ["Edgar Allan Poe", "Walt Whitman", "Ralph Waldo Emerson", "Emily Dickinson"], "correct": 0 },
  { "category": "Literatur", "question": "In The Odyssey, who is the faithful wife of Odysseus?", "answers": ["Penelope", "Circe", "Calypso", "Helen"], "correct": 0 },
  { "category": "Literatur", "question": "Who wrote The Secret Garden?", "answers": ["Frances Hodgson Burnett", "Beatrix Potter", "Louisa May Alcott", "L.M. Montgomery"], "correct": 0 },
  { "category": "Literatur", "question": "What is the name of the estate in Wuthering Heights?", "answers": ["Wuthering Heights", "Thrushcross Grange", "Tara", " Pemberley"], "correct": 0 },
  { "category": "Literatur", "question": "Which literary movement focused on the subjective experience of characters?", "answers": ["Modernism", "Realism", "Romanticism", "Naturalism"], "correct": 0 },
  { "category": "Records", "question": "What is the record for the longest human hair?", "answers": ["Xie Qiuping", "Asha Zulu Mandela", "Tran Van Hay", "Kenichi Ito"], "correct": 0 },
  { "category": "Records", "question": "Which is the largest man-made lake by volume?", "answers": ["Lake Kariba", "Lake Volta", "Lake Mead", "Lake Nasser"], "correct": 0 },
  { "category": "Records", "question": "What is the most translated book in the world?", "answers": ["The Bible", "The Little Prince", "Pinocchio", "The Quran"], "correct": 0 },
  { "category": "Records", "question": "Which is the world's busiest airport by passenger traffic?", "answers": ["Hartsfield–Jackson Atlanta International Airport", "Dubai International Airport", "London Heathrow", "Tokyo Haneda"], "correct": 0 },
  { "category": "Records", "question": "What is the loudest animal on Earth?", "answers": ["The sperm whale", "The blue whale", "The howler monkey", "The lion"], "correct": 0 },
  { "category": "Records", "question": "Which country produces the most coffee?", "answers": ["Brazil", "Vietnam", "Colombia", "Indonesia"], "correct": 0 },
  { "category": "Records", "question": "What is the record for the most points scored in an NBA game by one player?", "answers": ["Wilt Chamberlain (100)", "Kobe Bryant (81)", "David Thompson (73)", "Devin Booker (70)"], "correct": 0 }
];

// =========================================================================
// 2. SEED-BASED PSEUDO-RANDOM GENERATOR
// =========================================================================
function getDailyRandom(seedString) {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    return function() {
        const x = Math.sin(hash++) * 10000;
        return x - Math.floor(x);
    };
}

const todayStr = new Date().toISOString().split('T')[0];
const dailyRandom = getDailyRandom(todayStr);

function shuffleArrayDaily(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(dailyRandom() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// =========================================================================
// 3. DYNAMIC ACCESS CONTROL (DAILY REFRESH)
// =========================================================================
window.onload = function() {
    if (localStorage.getItem(`quiz_completed_${todayStr}`) === 'true') {
        document.getElementById('start-screen').innerHTML = `
            <div class="clock-icon">🚫</div>
            <h1 style="color: #ff4757;">Shift Denied</h1>
            <p>You have already clocked in for today's shift.<br>Return tomorrow for the next deployment.</p>
        `;
    }
};

// =========================================================================
// 4. DYNAMIC DATA SELECTION & ANSWER SHUFFLING
// =========================================================================
let quizData = [];

function buildDailyQuiz() {
    if (typeof rawQuizData === 'undefined' || rawQuizData.length === 0) {
        console.error("Questions database (rawQuizData) not found or empty!");
        return;
    }

    const groupedByTopic = {};
    rawQuizData.forEach(item => {
        // Fallback-Logik, falls manche Fragen fälschlicherweise "category" statt "topic" nutzen
        const topicName = item.topic || item.category || "General";
        if (!groupedByTopic[topicName]) {
            groupedByTopic[topicName] = [];
        }
        groupedByTopic[topicName].push(item);
    });

    const allTopics = Object.keys(groupedByTopic);
    const shuffledTopics = shuffleArrayDaily(allTopics);
    const selectedTopics = shuffledTopics.slice(0, 5);
    
    let compiledQuestions = [];

    selectedTopics.forEach(topic => {
        let categoryQuestions = [...groupedByTopic[topic]];
        categoryQuestions = shuffleArrayDaily(categoryQuestions);
        const dailyTen = categoryQuestions.slice(0, 10);
        
        dailyTen.forEach(q => {
            const shuffledAnswers = shuffleArrayDaily([...q.answers]);
            const newCorrectIndex = shuffledAnswers.indexOf(q.answers[q.correct]);

            compiledQuestions.push({
                topic: topic,
                question: q.question,
                answers: shuffledAnswers,
                correct: newCorrectIndex
            });
        });
    });

    quizData = compiledQuestions;
}

// =========================================================================
// 5. CORE GAME LOGIC
// =========================================================================
const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;
let streak = 0;

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const progressBar = document.getElementById('progress-bar');
const streakBadge = document.getElementById('streak-badge');

startBtn.onclick = () => {
    const nameValue = document.getElementById('player-name').value.trim();
    if(!nameValue) return alert("Please enter your name!");
    
    buildDailyQuiz();
    
    if (quizData.length === 0) return alert("Error loading quiz data!");

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
};

function loadQuestion() {
    isAnswered = false;
    timeLeft = 10.0;
    const q = quizData[currentQuestionIndex];
    
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;

    document.getElementById('topic-display').innerText = q.topic;
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
    document.getElementById('question-text').innerText = q.question; 
    
    answersContainer.innerHTML = "";
    
    q.answers.forEach((alt, i) => { 
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerText = alt;
        btn.onclick = () => selectAnswer(i, btn);
        answersContainer.appendChild(btn);
    });
    
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 0.05;
        if(timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
            selectAnswer(-1, null);
        }
        updateClockUI();
    }, 50);
}

function updateClockUI() {
    document.getElementById('time-display').innerText = Math.ceil(timeLeft);
    const rotation = (10 - timeLeft) * 36;
    const hand = document.getElementById('clock-hand');
    if(hand) hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
}

function selectAnswer(idx, btn) {
    if(isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    
    const correctIdx = quizData[currentQuestionIndex].correct; 
    const btns = answersContainer.querySelectorAll('.answer-btn');

    // Buttons einfärben und deaktivieren
    btns.forEach((b, i) => {
        if(i === correctIdx) {
            b.classList.add('correct');
        } else if(i === idx) {
            b.classList.add('wrong');
        }
        b.disabled = true;
    });

    if(idx === correctIdx) {
        streak++;
        
        // Multiplikator-Logik
        let multiplier = 1.0;
        if(streak >= 10) multiplier = 2.0;
        else if(streak >= 5) multiplier = 1.5;
        else if(streak >= 3) multiplier = 1.2;
        
        // Punkteberechnung (Basis 100 Punkte + Zeitbonus)
        const basePoints = 100;
        const timeBonus = Math.floor(timeLeft * 10);
        const pointsGained = Math.round((basePoints + timeBonus) * multiplier);
        score += pointsGained;
        
        if(streakBadge) {
            if(streak >= 3) {
                streakBadge.innerText = `${streak}x Streak!`;
                streakBadge.style.display = 'block';
            } else {
                streakBadge.style.display = 'none';
            }
        }
    } else {
        streak = 0;
        if(streakBadge) streakBadge.style.display = 'none';
    }

    const scoreDisplay = document.getElementById('score-display');
    if(scoreDisplay) scoreDisplay.innerText = score;

    // Nach einer kurzen Pause zur nächsten Frage wechseln
    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1500);
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').classList.remove('active');
    
    const endScreen = document.getElementById('end-screen');
    if(endScreen) endScreen.classList.add('active');
    
    const finalScoreElem = document.getElementById('final-score');
    if(finalScoreElem) finalScoreElem.innerText = score;

    const playerName = document.getElementById('player-name').value.trim();

    // Heute als erledigt markieren
    localStorage.setItem(`quiz_completed_${todayStr}`, 'true');

    // Bericht an Formspree senden
    fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: playerName,
            score: score,
            date: todayStr,
            message: `Quiz completed by ${playerName}. Score: ${score}`
        })
    })
    .then(response => {
        if (response.ok) {
            console.log("Score successfully transmitted!");
        } else {
            console.error("Transmission failed.");
        }
    })
    .catch(error => {
        console.error("Error submitting score:", error);
    });
}
