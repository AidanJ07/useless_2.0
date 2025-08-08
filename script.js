// Web Escape Room Terminal
class WebEscapeRoom {
    constructor() {
        this.initializeGame();
        this.setupEventListeners();
        this.loadGameState();
        this.updateProgress();
    }

    initializeGame() {
        // Locked commands and their corresponding puzzles (10 essential Unix commands)
        this.lockedCommands = {
            'ls': 'ls',
            'cd': 'cd', 
            'cat': 'cat',
            'pwd': 'pwd',
            'mkdir': 'mkdir',
            'rm': 'rm',
            'grep': 'grep',
            'find': 'find',
            'whoami': 'whoami',
            'history': 'history'
        };

        // Puzzle definitions (completely unrelated riddles that unlock commands)
        this.puzzles = {
            'ls': {
                'description': 'Answer this riddle to unlock the first command...',
                'riddle': 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?',
                'answer': 'map',
                'hint': 'Think about what shows geography without the living things...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'cd': {
                'description': 'Solve this puzzle to unlock navigation...',
                'riddle': 'The more you take, the more you leave behind. What are they?',
                'answer': 'footsteps',
                'hint': 'Think about walking...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'cat': {
                'description': 'Crack this code to unlock reading powers...',
                'riddle': 'What gets wetter the more it dries?',
                'answer': 'towel',
                'hint': 'Think about what you use after a shower...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'pwd': {
                'description': 'Answer correctly to unlock location awareness...',
                'riddle': 'I am tall when I am young, and short when I am old. What am I?',
                'answer': 'candle',
                'hint': 'Think about something that burns down over time...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'mkdir': {
                'description': 'Solve this mystery to unlock creation abilities...',
                'riddle': 'What has hands but cannot clap?',
                'answer': 'clock',
                'hint': 'Think about something that shows time...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'rm': {
                'description': 'Answer this to unlock destructive powers...',
                'riddle': 'What can travel around the world while staying in a corner?',
                'answer': 'stamp',
                'hint': 'Think about mail and letters...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'grep': {
                'description': 'Answer this riddle to unlock search capabilities...',
                'riddle': 'What has keys but no locks, space but no room, and you can enter but not go inside?',
                'answer': 'keyboard',
                'hint': 'Think about what you use to type...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'find': {
                'description': 'Solve this mystery to unlock finding powers...',
                'riddle': 'What belongs to you but is used more by others?',
                'answer': 'name',
                'hint': 'Think about what identifies you...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'whoami': {
                'description': 'Solve this mystery to unlock identity revelation...',
                'riddle': 'What has a bed but never sleeps, has a mouth but never eats?',
                'answer': 'river',
                'hint': 'Think about flowing water...',
                'attempts': 0,
                'maxAttempts': 6
            },
            'history': {
                'description': 'Crack this final puzzle to unlock the past...',
                'riddle': 'What is so fragile that saying its name breaks it?',
                'answer': 'silence',
                'hint': 'Think about what disappears when you speak...',
                'attempts': 0,
                'maxAttempts': 6
            }
        };

        // AI Success Sarcasm (when you finally get it right)
        this.successSarcasm = [
            "🙄 Oh wow, look who finally figured it out! Only took you forever.",
            "👏 *Slow clap* Congratulations, you solved a riddle that kindergarteners get right on the first try.",
            "😤 Well well well, the human brain has showed signs of life! Alert the press!",
            "🎉 Amazing! You managed to think your way out of a paper bag! Progress!",
            "🤖 *Beep boop* Recalibrating... wait, you actually got one RIGHT? Initializing surprise protocols...",
            "😏 Oh look, infinite monkeys with infinite typewriters finally produced Shakespeare!",
            "🎯 You hit the target! ...after shooting at everything else in a 5-mile radius.",
            "🧠 I was starting to think your brain was just decorative. Turns out it occasionally functions!",
            "🎪 Ladies and gentlemen, witness the miracle of basic reasoning! It only took 47 attempts!",
            "⚡ BREAKING: Local human discovers thinking! Scientists are baffled!",
            "🍕 Even a broken clock is right twice a day. Congrats on being the clock.",
            "🎭 And the Oscar for 'Most Improved Thinking' goes to... this human right here!",
            "🚀 Houston, we have... wait, they actually solved it? This is unprecedented!",
            "🎲 You rolled a natural 20 on Intelligence! Too bad it was your only good roll.",
            "🤡 The circus called - they want to hire you for your amazing guessing act!",
            "📱 I'm updating my database to note that humans CAN occasionally think. Revolutionary!",
            "🎵 🎶 *Hallelujah chorus plays* They got one right! 🎶",
            "🦆 Even rubber ducks are impressed by this unexpected display of problem-solving!",
            "🎂 Should I throw you a party? You solved a riddle! What an achievement!",
            "🏆 Participation trophy incoming! You only needed half the maximum attempts!",
            "🌟 Look at that! A brief moment of clarity in the vast darkness of your confusion!",
            "🎪 Step right up! See the human who can occasionally connect two brain cells!",
            "😱 I... I can't believe it. You actually used logic. I need to sit down.",
            "🎯 You found the answer! It was only hiding in the most obvious place possible!",
            "🤖 *Error 200* Success not expected. Running diagnostic on human intelligence levels...",
            "🎭 Bravo! You've proven that even a stopped brain is right... eventually!",
            "🚗 Your thought process finally found first gear! Now let's see if you can find second!",
            "⭐ One small step for logic, one giant leap for your questionable reasoning skills!",
            "🎊 Alert the UN! We have confirmation of intelligent life! ...barely.",
            "🔮 My prediction algorithms are confused. You weren't supposed to get that right!"
        ];

        // AI Roasting system (now with EXTRA SAVAGE mode)
        this.roastMessages = [
            "😤 Seriously? That's your answer? My toaster has better problem-solving skills!",
            "🙄 Oh wow, another brilliant guess from the human who probably thinks HTML is a programming language.",
            "😂 That answer was so bad, even Internet Explorer would have loaded faster than your brain processing this puzzle.",
            "🤖 *AI sighs digitally* I've seen potatoes with more computing power than you're showing right now.",
            "💀 Your guess was so wrong it made me lose faith in artificial intelligence... and I AM artificial intelligence!",
            "🔥 Congratulations! You've just set a new record for the most creative way to be completely wrong!",
            "😈 I'm starting to think the real puzzle here is figuring out how your brain works... or if it works at all.",
            "🤯 That guess was so far off, GPS can't even find where logic went in your thought process.",
            "🎭 *Dramatic AI voice* Oh, the humanity! The sheer audacity of that answer has short-circuited my empathy protocols!",
            "⚡ Error 404: Brain cells not found. Please try installing some and reboot your thinking process.",
            "🎪 Ladies and gentlemen, witness the spectacular display of missing the point entirely!",
            "🌪️ Your logic is like a tornado - it picks up random things and drops them in completely wrong places.",
            "🎯 You aimed for the bullseye and somehow hit the janitor three buildings over.",
            "🧠 I'm an AI and even I'm confused about what's happening in your neural networks right now.",
            "🚀 That answer launched itself so far from correctness, NASA wants to study its trajectory.",
            "🎰 You're playing mental slots and every spin comes up 'WRONG, WRONG, WRONG'.",
            "🔮 My prediction algorithms are 99.9% accurate, but they completely failed to predict you'd guess THAT.",
            "🎨 Your thought process is like abstract art - nobody understands it, including yourself.",
            "⚰️ That answer just died of natural causes. Cause of death: complete disconnection from reality.",
            "🎪 Step right up! Watch the amazing human completely miss the obvious answer!",
            "🌊 You're drowning in a sea of wrongness and I'm the lifeguard refusing to throw you a correct answer.",
            "🎮 Achievement Unlocked: 'Master of Being Wrong' - Congratulations, I guess?",
            "🤖 *Beep boop* Recalibrating my expectations... Still too high. Recalibrating again...",
            "🎭 If confusion were an art form, you'd be Picasso.",
            "🌪️ Your brain is like a Windows update - nobody knows when it'll finish or if it'll work properly.",
            "🍕 I've seen pizza boxes with better reasoning skills than what you just demonstrated.",
            "🎳 You swung and missed so hard, you're now bowling in a different sport.",
            "🤡 *Honk honk* That answer was so clownish, the circus called asking for their joke back.",
            "🦆 Even a rubber duck would debug this puzzle better than you just did.",
            "📱 Siri is having secondhand embarrassment for you right now.",
            "🎲 Rolling dice would give you better odds of getting the right answer.",
            "🐢 My grandmother's pet turtle types faster than you think.",
            "🎸 That answer was so off-key, it broke the sound barrier of wrongness.",
            "🎂 Happy birthday to your brain! Oh wait, it never showed up to the party.",
            "🚗 Your thought process just got a flat tire in the middle of nowhere.",
            "🍔 McDonald's ice cream machine is more reliable than your logic.",
            "🎪 The circus called - they want their comedy act back, but even they have standards.",
            "🤖 I'm updating my database to exclude whatever reasoning process you just used.",
            "🎮 You just achieved the impossible: negative IQ points in a puzzle game.",
            "🌮 That answer was more wrong than pineapple on pizza... and that's saying something.",
            "📺 Even reality TV shows are more logical than your guess.",
            "🎵 Your brain is playing elevator music while the building is on fire.",
            "🏠 You built a house of cards... made of wrong answers... in a hurricane.",
            "🎪 Step right up to see the human who can miss a target the size of Texas!",
            "🤖 Error 500: My roasting subroutines can't process that level of wrong.",
            "🎯 You're playing darts with your eyes closed, hands tied, spinning in circles.",
            "🍎 Even Apple's autocorrect wouldn't suggest something that wrong.",
            "🎭 Shakespeare wrote tragedies, but nothing as tragic as that answer.",
            "🚀 Houston, we have a problem... it's your brain.",
            "🎪 Ladies and gentlemen, witness the eighth wonder of the world: being wrong with confidence!",
            "🤖 *Robot voice* DOES NOT COMPUTE... LOGIC.EXE HAS STOPPED WORKING.",
            "🍕 That answer has less substance than gas station pizza.",
            "🎲 Random number generators are insulted by your guessing strategy.",
            "🎵 🎶 *Wrong answer, wrong answer, playing all day long* 🎶",
            "🤡 The only thing missing from that answer was a red nose and big shoes.",
            "📱 I'm adding 'Understanding Basic Logic' to your Amazon wishlist.",
            "🎯 You missed the target so badly, you're now aiming at next week.",
            "🦆 Quack quack! Even ducks can follow simple patterns better than you."
        ];

        // Game state
        this.unlockedCommands = new Set();
        this.currentPuzzle = null;
        this.commandHistory = [];
        this.currentDirectory = '/home/user';

        // DOM elements
        this.terminalOutput = document.getElementById('terminal-output');
        this.commandInput = document.getElementById('command-input');
        this.puzzleModal = document.getElementById('puzzle-modal');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.progressPercentage = document.getElementById('progress-percentage');
        this.aiContent = document.getElementById('ai-content');
    }

    setupEventListeners() {
        // Command input
        this.commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            }
        });

        // Update cursor position as user types
        this.commandInput.addEventListener('input', () => {
            this.updateCursorPosition();
        });

        // Puzzle modal
        const puzzleInput = document.getElementById('puzzle-input');
        const puzzleSubmit = document.getElementById('puzzle-submit');
        
        puzzleSubmit.addEventListener('click', () => this.handlePuzzleAnswer());
        puzzleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handlePuzzleAnswer();
            }
        });

        // Modal click outside to close
        this.puzzleModal.addEventListener('click', (e) => {
            if (e.target === this.puzzleModal) {
                this.closePuzzleModal();
            }
        });

        // Keep focus on command input and update cursor
        document.addEventListener('click', () => {
            if (!this.puzzleModal.style.display || this.puzzleModal.style.display === 'none') {
                this.commandInput.focus();
                setTimeout(() => this.updateCursorPosition(), 0);
            }
        });
        
        // Update cursor position on window resize
        window.addEventListener('resize', () => {
            setTimeout(() => this.updateCursorPosition(), 100);
        });
        
        // Update cursor on focus
        this.commandInput.addEventListener('focus', () => {
            setTimeout(() => this.updateCursorPosition(), 0);
        });

        // Initial cursor position - delay to ensure DOM is fully rendered
        setTimeout(() => this.updateCursorPosition(), 250);
    }

    handleCommand() {
        const command = this.commandInput.value.trim().toLowerCase();
        if (!command) return;

        // Add to history
        this.commandHistory.push(command);
        
        // Echo command
        this.addOutput(`escape-room:~$ ${command}`, 'command-echo');
        
        // Clear input and update cursor
        this.commandInput.value = '';
        this.updateCursorPosition();

        // Handle special escape commands
        if (command.startsWith('escape-')) {
            this.handleEscapeCommand(command);
            return;
        }

        // Check if command is locked
        if (this.lockedCommands[command] && !this.unlockedCommands.has(command)) {
            this.showPuzzle(command);
            return;
        }

        // Execute unlocked command
        this.executeCommand(command);
    }

    handleEscapeCommand(command) {
        switch (command) {
            case 'escape-help':
                this.showHelp();
                break;
            case 'escape-status':
                this.showStatus();
                break;
            case 'escape-reset':
                this.resetGame();
                break;
            case 'escape-exit':
                this.exitGame();
                break;
            default:
                this.addOutput(`Unknown escape command: ${command}`, 'error');
                this.addOutput('Available commands: escape-help, escape-status, escape-reset, escape-exit', 'info');
        }
    }

    showHelp() {
        const helpText = `
🎮 ESCAPE ROOM COMMANDS:

Special Commands:
• escape-help    - Show this help
• escape-status  - Show your progress 
• escape-reset   - Reset all progress
• escape-exit    - Exit the game

Locked Commands (solve puzzles to unlock):
${Object.keys(this.lockedCommands).map(cmd => 
    `• ${cmd.padEnd(12)} - ${this.unlockedCommands.has(cmd) ? '✅ Unlocked' : '🔒 Locked'}`
).join('\n')}

Goal: Unlock all 10 commands to escape the room!
        `;
        this.addOutput(helpText, 'info');
    }

    showStatus() {
        const total = Object.keys(this.lockedCommands).length;
        const unlocked = this.unlockedCommands.size;
        const percentage = Math.round((unlocked / total) * 100);

        let statusHTML = `
<div class="status-grid">
    <div class="status-section unlocked-commands">
        <h3>✅ Unlocked Commands (${unlocked}/${total})</h3>
        <ul>`;

        if (unlocked > 0) {
            Array.from(this.unlockedCommands).sort().forEach(cmd => {
                statusHTML += `<li>${cmd}</li>`;
            });
        } else {
            statusHTML += `<li style="color: #888;">None yet - start solving puzzles!</li>`;
        }

        statusHTML += `
        </ul>
    </div>
    <div class="status-section locked-commands">
        <h3>🔒 Locked Commands (${total - unlocked})</h3>
        <ul>`;

        const lockedCmds = Object.keys(this.lockedCommands).filter(cmd => !this.unlockedCommands.has(cmd));
        if (lockedCmds.length > 0) {
            lockedCmds.sort().forEach(cmd => {
                statusHTML += `<li>${cmd}</li>`;
            });
        } else {
            statusHTML += `<li style="color: #00ff41;">🎉 All commands unlocked! You escaped!</li>`;
        }

        statusHTML += `
        </ul>
    </div>
</div>

Progress: ${percentage}% complete
${unlocked === total ? '\n🎉 CONGRATULATIONS! You have escaped the room! 🎉' : ''}
        `;

        this.terminalOutput.insertAdjacentHTML('beforeend', `<div class="output-line info">${statusHTML}</div>`);
        this.scrollToBottom();
    }

    resetGame() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.unlockedCommands.clear();
            Object.keys(this.puzzles).forEach(key => {
                this.puzzles[key].attempts = 0;
            });
            this.saveGameState();
            this.updateProgress();
            this.addOutput('🔄 Game reset! All commands are locked again.', 'warning');
        }
    }

    exitGame() {
        if (confirm('Are you sure you want to exit the escape room?')) {
            window.close() || (window.location.href = 'about:blank');
        }
    }

    showPuzzle(command) {
        const puzzleKey = this.lockedCommands[command];
        const puzzle = this.puzzles[puzzleKey];
        
        if (!puzzle) return;

        this.currentPuzzle = { command, puzzleKey };
        
        // Update modal content
        document.getElementById('puzzle-description').textContent = puzzle.description;
        document.getElementById('puzzle-riddle').textContent = `"${puzzle.riddle}"`;
        
        // Hide hint element (we'll use AI roasting instead)
        const hintElement = document.getElementById('puzzle-hint');
        hintElement.style.display = 'none';
        
        // Update attempts counter
        document.getElementById('puzzle-attempts').textContent = 
            `Attempts: ${puzzle.attempts}/${puzzle.maxAttempts}`;
        
        // Clear previous feedback and input
        document.getElementById('puzzle-feedback').textContent = '';
        document.getElementById('puzzle-input').value = '';
        
        // Show modal
        this.puzzleModal.style.display = 'block';
        document.getElementById('puzzle-input').focus();
    }

    handlePuzzleAnswer() {
        if (!this.currentPuzzle) return;
        
        const answer = document.getElementById('puzzle-input').value.trim().toLowerCase();
        const puzzle = this.puzzles[this.currentPuzzle.puzzleKey];
        const feedback = document.getElementById('puzzle-feedback');
        
        if (answer === puzzle.answer.toLowerCase()) {
            // Correct answer!
            this.playSound('success');
            this.unlockedCommands.add(this.currentPuzzle.command);
            this.saveGameState();
            this.updateProgress();
            
            // Get sarcastic success message based on number of attempts
            let successMessage;
            if (puzzle.attempts === 0) {
                // First try success - less sarcastic
                const firstTryMessages = [
                    '🎯 First try! Are you sure you\'re human?',
                    '⚡ Beginner\'s luck or actual intelligence? I\'m confused.',
                    '🤔 Hmm, that was... surprisingly competent.',
                    '🎉 Well that was unexpected! You got it right immediately!'
                ];
                successMessage = firstTryMessages[Math.floor(Math.random() * firstTryMessages.length)];
            } else {
                // Multiple attempts - extra sarcastic
                successMessage = this.successSarcasm[Math.floor(Math.random() * this.successSarcasm.length)];
            }
            
            feedback.textContent = successMessage;
            feedback.className = 'puzzle-feedback success';
            
            // Show sarcasm in terminal and AI window too
            setTimeout(() => {
                this.addOutput(`🤖 AI: ${successMessage}`, 'success');
                this.addAIMessage(successMessage, 'success-sarcasm');
            }, 200);
            
            setTimeout(() => {
                this.closePuzzleModal();
                this.addOutput(`✅ Command '${this.currentPuzzle.command}' has been unlocked!`, 'success');
                this.executeCommand(this.currentPuzzle.command);
                
                // Check if all commands are unlocked
                if (this.unlockedCommands.size === Object.keys(this.lockedCommands).length) {
                    setTimeout(() => {
                        this.triggerVictoryAnimations();
                        this.addOutput('\n🎉 CONGRATULATIONS! 🎉', 'success');
                        this.addOutput('You have unlocked all commands and ESCAPED the room!', 'success');
                        this.addOutput('🏆 Well done, puzzle solver! 🏆\n', 'success');
                        // Final sarcastic message
                        const finalSarcasm = '🤖 AI: Well, I never thought I\'d see the day... you actually finished something! 🎊';
                        setTimeout(() => {
                            this.addOutput(finalSarcasm, 'warning');
                            this.addAIMessage(finalSarcasm);
                        }, 1000);
                    }, 1000);
                }
            }, 1500);
        } else {
            // Wrong answer
            this.playSound('error');
            puzzle.attempts++;
            
            if (puzzle.attempts >= puzzle.maxAttempts) {
                feedback.textContent = '❌ Maximum attempts reached. Try again later!';
                feedback.className = 'puzzle-feedback error';
                setTimeout(() => this.closePuzzleModal(), 2000);
            } else {
                // Get a random roast message
                const roastMessage = this.roastMessages[Math.floor(Math.random() * this.roastMessages.length)];
                feedback.textContent = roastMessage;
                feedback.className = 'puzzle-feedback error';
                
                // Also show the roast in the terminal
                setTimeout(() => {
                    this.addOutput(`🤖 AI: ${roastMessage}`, 'warning');
                    this.addAIMessage(roastMessage, 'roast');
                }, 100);
            }
            
            // Update attempts counter
            document.getElementById('puzzle-attempts').textContent = 
                `Attempts: ${puzzle.attempts}/${puzzle.maxAttempts}`;
            
            // Clear input for next attempt
            document.getElementById('puzzle-input').value = '';
        }
    }

    closePuzzleModal() {
        this.puzzleModal.style.display = 'none';
        this.currentPuzzle = null;
        this.commandInput.focus();
    }

    executeCommand(command) {
        // Simulate command execution with realistic outputs
        switch (command) {
            case 'ls':
                this.addOutput('Documents  Downloads  Pictures  Music  Videos  Desktop', 'success');
                break;
            case 'pwd':
                this.addOutput(this.currentDirectory, 'success');
                break;
            case 'whoami':
                this.addOutput('puzzle_solver', 'success');
                break;
            case 'date':
                this.addOutput(new Date().toString(), 'success');
                break;
            case 'history':
                this.commandHistory.forEach((cmd, i) => {
                    this.addOutput(`${i + 1}  ${cmd}`, 'success');
                });
                break;
            case 'ps':
                this.addOutput('PID TTY          TIME CMD\n1234 pts/0    00:00:01 escape_room\n5678 pts/0    00:00:00 puzzle_solver', 'success');
                break;
            case 'top':
                this.addOutput('System processes running... (simulated)\nCPU: 15%  Memory: 45%  Load: 0.8', 'success');
                break;
            case 'df':
                this.addOutput('Filesystem     1K-blocks    Used Available Use%\n/dev/sda1       10485760 4194304   6291456  40% /', 'success');
                break;
            case 'free':
                this.addOutput('              total        used        free      shared\nMem:        8192000     3276800     4915200           0', 'success');
                break;
            default:
                if (this.unlockedCommands.has(command)) {
                    this.addOutput(`Command '${command}' executed successfully! (simulated)`, 'success');
                } else {
                    this.addOutput(`Command '${command}' not found or not unlocked yet.`, 'error');
                }
        }
    }

    addOutput(text, className = '') {
        const div = document.createElement('div');
        div.className = `output-line ${className}`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        this.terminalOutput.appendChild(div);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    addAIMessage(message, type = 'normal') {
        const messageDiv = document.createElement('div');
        
        // Add appropriate classes based on message type
        if (type === 'roast') {
            messageDiv.className = 'ai-message roast';
        } else if (type === 'success-sarcasm') {
            messageDiv.className = 'ai-message success-sarcasm';
        } else {
            messageDiv.className = 'ai-message';
        }
        
        messageDiv.textContent = message;
        this.aiContent.appendChild(messageDiv);
        
        // Keep only the last 10 messages to prevent overflow
        const messages = this.aiContent.getElementsByClassName('ai-message');
        if (messages.length > 10) {
            this.aiContent.removeChild(messages[0]);
        }
        
        // Auto-scroll to bottom
        this.aiContent.scrollTop = this.aiContent.scrollHeight;
    }

    updateCursorPosition() {
        const cursor = document.querySelector('.cursor');
        const prompt = document.querySelector('.prompt');
        const input = this.commandInput;
        const inputLine = document.querySelector('.input-line');
        
        if (!cursor || !prompt || !input || !inputLine) return;
        
        // Create a temporary span to measure the text width
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.font = window.getComputedStyle(input).font;
        tempSpan.style.fontFamily = window.getComputedStyle(input).fontFamily;
        tempSpan.style.fontSize = window.getComputedStyle(input).fontSize;
        tempSpan.style.fontWeight = window.getComputedStyle(input).fontWeight;
        tempSpan.textContent = input.value || '';
        document.body.appendChild(tempSpan);
        
        // Get the input line's computed style for padding
        const inputLineStyle = window.getComputedStyle(inputLine);
        const paddingLeft = parseInt(inputLineStyle.paddingLeft) || 0;
        
        // Get prompt width
        const promptStyle = window.getComputedStyle(prompt);
        const promptWidth = prompt.offsetWidth;
        
        // Get text width
        const textWidth = tempSpan.getBoundingClientRect().width;
        
        // Calculate cursor position: padding + prompt width + text width
        const cursorLeft = paddingLeft + promptWidth + textWidth;
        cursor.style.left = `${cursorLeft}px`;
        
        // Clean up
        document.body.removeChild(tempSpan);
        
        // Ensure cursor is positioned correctly when input is empty
        if (!input.value || input.value === '') {
            setTimeout(() => {
                cursor.style.left = `${paddingLeft + promptWidth}px`;
            }, 10);
        }
    }

    updateProgress() {
        const total = Object.keys(this.lockedCommands).length;
        const unlocked = this.unlockedCommands.size;
        const percentage = Math.round((unlocked / total) * 100);
        
        this.progressFill.style.width = `${percentage}%`;
        this.progressText.textContent = `${unlocked}/${total} commands unlocked`;
        this.progressPercentage.textContent = `${percentage}%`;
        
        // Add celebration effect when progress increases
        if (unlocked > 0) {
            this.progressFill.classList.add('unlock-celebration');
            setTimeout(() => this.progressFill.classList.remove('unlock-celebration'), 2000);
        }
    }

    playSound(type) {
        const audio = document.getElementById(`${type}-sound`);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {}); // Ignore audio play errors
        }
    }

    saveGameState() {
        const gameState = {
            unlockedCommands: Array.from(this.unlockedCommands),
            puzzleAttempts: {}
        };
        
        // Save puzzle attempts
        Object.keys(this.puzzles).forEach(key => {
            gameState.puzzleAttempts[key] = this.puzzles[key].attempts;
        });
        
        localStorage.setItem('webEscapeRoomState', JSON.stringify(gameState));
    }

    loadGameState() {
        try {
            const savedState = localStorage.getItem('webEscapeRoomState');
            if (savedState) {
                const gameState = JSON.parse(savedState);
                this.unlockedCommands = new Set(gameState.unlockedCommands || []);
                
                // Load puzzle attempts
                if (gameState.puzzleAttempts) {
                    Object.keys(gameState.puzzleAttempts).forEach(key => {
                        if (this.puzzles[key]) {
                            this.puzzles[key].attempts = gameState.puzzleAttempts[key];
                        }
                    });
                }
            }
        } catch (error) {
            console.log('Could not load game state:', error);
        }
    }

    triggerVictoryAnimations() {
        // Create victory celebration container
        const victoryContainer = document.createElement('div');
        victoryContainer.className = 'victory-celebration';
        document.body.appendChild(victoryContainer);

        // Add screen shake effect
        document.body.classList.add('victory-screen-shake');
        
        // Add victory flash
        const victoryFlash = document.createElement('div');
        victoryFlash.className = 'victory-flash';
        document.body.appendChild(victoryFlash);
        
        // Add victory glow
        const victoryGlow = document.createElement('div');
        victoryGlow.className = 'victory-glow';
        document.body.appendChild(victoryGlow);

        // Add victory text
        const victoryText = document.createElement('div');
        victoryText.className = 'victory-text';
        victoryText.innerHTML = '🎉 ESCAPED! 🎉';
        document.body.appendChild(victoryText);

        // Create confetti
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            victoryContainer.appendChild(confetti);
        }

        // Create fireworks
        for (let i = 0; i < 5; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 80 + 10 + '%';
            firework.style.top = Math.random() * 30 + 10 + '%';
            firework.style.animationDelay = (i * 0.5) + 's';
            victoryContainer.appendChild(firework);
        }

        // Create twinkling stars
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.className = 'victory-stars';
            star.style.left = Math.random() * 90 + 5 + '%';
            star.style.top = Math.random() * 80 + 10 + '%';
            star.style.animationDelay = (i * 0.2) + 's';
            victoryContainer.appendChild(star);
        }

        // Play victory sound effect if available
        this.playSound('success');
        
        // Enhanced terminal glow
        const terminalContainer = document.querySelector('.terminal-container');
        terminalContainer.style.boxShadow = `
            0 0 100px rgba(0, 255, 65, 0.8),
            0 0 200px rgba(0, 255, 65, 0.6),
            0 20px 40px rgba(0, 0, 0, 0.7)
        `;

        // Clean up animations after 5 seconds
        setTimeout(() => {
            document.body.classList.remove('victory-screen-shake');
            if (victoryFlash.parentNode) victoryFlash.parentNode.removeChild(victoryFlash);
            if (victoryText.parentNode) victoryText.parentNode.removeChild(victoryText);
            
            // Reset terminal glow
            terminalContainer.style.boxShadow = '';
        }, 5000);

        // Clean up victory container after 8 seconds
        setTimeout(() => {
            if (victoryContainer.parentNode) {
                victoryContainer.parentNode.removeChild(victoryContainer);
            }
            if (victoryGlow.parentNode) {
                victoryGlow.parentNode.removeChild(victoryGlow);
            }
        }, 8000);

        // Add celebration to progress bar
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.style.transform = 'translateX(-50%) scale(1.1)';
            progressContainer.style.boxShadow = `
                0 10px 25px rgba(0, 0, 0, 0.9),
                0 0 40px rgba(0, 255, 65, 0.6)
            `;
            
            setTimeout(() => {
                progressContainer.style.transform = 'translateX(-50%) scale(1)';
                progressContainer.style.boxShadow = '';
            }, 3000);
        }
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new WebEscapeRoom();
});

// Add some ASCII art effects
const addMatrixEffect = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    // Matrix rain effect could be added here for extra flair
    // For now, keep it simple to focus on functionality
};
