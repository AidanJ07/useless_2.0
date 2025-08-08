# 🎮 Escape Room Terminal - Color Scheme & Animation Guide

## 🎨 Color Palette

### Primary Colors
- **Matrix Green (Primary)**: `#00ff41` - Used for success, main text, and terminal glow
- **Matrix Green Dark**: `#00aa33` - Used for gradients and darker accents
- **Background Black**: `#000` - Main background color
- **Terminal Background**: `rgba(0, 0, 0, 0.85)` - Semi-transparent terminal background

### Message Type Colors
- **Success**: `#00ff41` (Matrix Green) - Command success, unlocked features
- **Error**: `#ff4444` (Red) - Failed attempts, locked commands
- **Info**: `#44aaff` (Blue) - Informational messages, help text
- **Warning**: `#ffaa44` (Orange) - Warnings, cautions
- **Command Echo**: `#888` (Gray) - User input echo

### AI Assistant Colors
- **AI Window Border**: `rgba(255, 170, 68, 0.6)` (Orange)
- **AI Background**: `rgba(255, 170, 68, 0.1)` (Light Orange)
- **AI Text**: `#ffaa44` (Orange)
- **AI Header**: Linear gradient `#ff6b35` to `#ff8c42`

### Special Animation Colors
- **Roast Messages**: `#ff4444` (Red) - For harsh AI feedback
- **Success Sarcasm**: `#ffc800` (Gold) - For sarcastic success messages
- **Scan Line Effect**: `rgba(0, 255, 65, 0.4)` (Semi-transparent green)
- **Progress Bar**: Linear gradient `#00ff41` to `#00aa33`

### Terminal Button Colors
- **Close Button**: `#ff5f56` (Red)
- **Minimize Button**: `#ffbd2e` (Yellow)
- **Maximize Button**: `#27ca3f` (Green)

---

## ✨ Animation Classes and Effects

### Input/Output Animations

#### **`.output-line`** - All terminal output
```css
animation: slideIn 0.5s ease-out;
```
- Slides in from left with blur effect
- Includes scan line effect that sweeps across
- Duration: 0.5 seconds

#### **`.command-echo`** - User command echo
```css
animation: echoFade 0.4s ease-in;
```
- Fades from green to gray
- Shows command transformation
- Duration: 0.4 seconds

#### **`.input-line`** - Command input area
```css
animation: inputLineGlow 3s ease-in-out infinite alternate;
```
- Subtle glow animation
- Enhanced on focus with lift effect
- Continuous alternating glow

#### **`.cursor`** - Terminal cursor
```css
animation: advancedBlink 1.2s infinite;
```
- Advanced blinking with scale transformation
- Includes glow effects
- More sophisticated than standard blink

### Message Type Animations

#### **`.success`** - Success messages
```css
animation: successGlow 0.6s ease-out;
```
- Grows and glows effect
- Includes bouncing checkmark (✓)
- Green glow intensifies then settles
- Duration: 0.6 seconds

#### **`.error`** - Error messages
```css
animation: errorShake 0.7s ease-out;
```
- Shakes horizontally with red glow
- Includes error mark (✗)
- Intensity decreases over time
- Duration: 0.7 seconds

#### **`.info`** - Information messages
```css
animation: infoSlide 0.5s ease-out;
```
- Slides down with blur effect
- Includes pulsing info icon (ℹ)
- Blue glow effect
- Duration: 0.5 seconds

#### **`.warning`** - Warning messages
```css
animation: warningFlash 0.8s ease-out;
```
- Background flash effect
- Includes blinking warning icon (⚠)
- Orange glow transition
- Duration: 0.8 seconds

### AI Message Animations

#### **`.ai-message`** - Standard AI messages
```css
animation: aiMessageSlideIn 0.5s ease-out;
```
- Slides in from right
- Standard orange theme
- Duration: 0.5 seconds

#### **`.ai-message.roast`** - AI roasting messages
```css
animation: roastFlash 0.8s ease-out;
```
- Red border flash effect
- Scaling effect for emphasis
- More aggressive visual feedback
- Duration: 0.8 seconds

#### **`.ai-message.success-sarcasm`** - Sarcastic success messages
```css
animation: sarcasticGlow 0.7s ease-out;
```
- Gold color theme
- Scale and glow effect
- Upward slide animation
- Duration: 0.7 seconds

### Progress and UI Animations

#### **`.progress-fill`** - Progress bar
```css
transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
animation: progressShine 2s ease-in-out infinite;
```
- Smooth width transitions
- Continuous shine effect
- Pulse animation when updating

#### **`.progress-fill.updating`** - Progress update
```css
animation: progressPulse 0.6s ease-in-out;
```
- Scale animation on updates
- Enhanced glow effect
- Visual feedback for progress changes

### Modal and Popup Animations

#### **`.modal-content`** - Puzzle modal
```css
animation: modalSlideIn 0.3s ease-out;
```
- Slides down with scale effect
- Quick and responsive
- Duration: 0.3 seconds

#### **`.puzzle-hint`** - Puzzle hints
```css
animation: hintGlow 0.5s ease-in;
```
- Upward slide with opacity fade
- Green glow effect
- Duration: 0.5 seconds

#### **`.ai-window`** - AI assistant window
```css
animation: aiWindowFloat 3s ease-in-out infinite alternate;
```
- Subtle floating effect
- Continuous gentle movement
- Creates alive feeling

### Special Effects

#### **`.unlock-celebration`** - Command unlock celebration
```css
animation: celebration 2s ease-out;
```
- Scale and rotation effects
- Multiple phases of movement
- Celebratory feel
- Duration: 2 seconds

#### **`.typing-effect`** - Typing animation
```css
animation: typing 1s steps(40) forwards;
```
- Typewriter effect
- Step-based animation
- 40 character steps

### Victory Animations

#### **`.victory-screen-shake`** - Victory screen shake
```css
animation: victoryShake 0.8s ease-in-out;
```
- Screen shake effect
- Multiple directions
- Decreasing intensity

#### **`.victory-flash`** - Victory flash overlay
```css
animation: victoryFlash 0.5s ease-out;
```
- Full-screen flash effect
- Radial gradient
- Quick and impactful

#### **`.confetti`** - Confetti particles
```css
animation: confettiFall 3s linear infinite;
```
- Falling animation with rotation
- Multiple colors and delays
- Continuous celebration effect

#### **`.firework`** - Firework explosions
```css
animation: firework1-5 2s ease-out;
```
- Expanding circles with colors
- Multiple explosion patterns
- Staggered timing

---

## 🎯 Animation Usage Guidelines

### When to Use Each Animation

1. **Input Animations**: Every user input and system response
2. **Message Types**: Match animation to message severity/type
3. **AI Messages**: Use `roast` class for harsh feedback, `success-sarcasm` for backhanded compliments
4. **Progress**: Use `updating` class when progress changes
5. **Special Effects**: Use `unlock-celebration` for major achievements

### Performance Considerations

- All animations use CSS transforms and opacity for GPU acceleration
- Durations are optimized for responsiveness (0.3s - 0.8s for most)
- Infinite animations use `alternate` direction to prevent jumps
- Complex animations (confetti, fireworks) are position-based

### Customization

To modify animations:
1. Adjust duration in the animation property
2. Change easing functions for different feels
3. Modify keyframe values for intensity
4. Add/remove animation classes as needed

### Color Customization

All colors use CSS custom properties concept through consistent naming:
- Change the base colors in the CSS variables
- Maintain contrast ratios for accessibility
- Keep glow effects subtle but visible
- Use semi-transparent overlays for depth

---

## 🚀 Implementation Examples

### Adding a new message type:
```css
.special-message {
    color: #your-color;
    animation: your-animation 0.6s ease-out;
}

@keyframes your-animation {
    from { /* start state */ }
    to { /* end state */ }
}
```

### Using animation classes in JavaScript:
```javascript
// Add animation class
element.classList.add('success', 'unlock-celebration');

// Remove after animation
setTimeout(() => {
    element.classList.remove('unlock-celebration');
}, 2000);
```

### Triggering special effects:
```javascript
// Progress update
progressFill.classList.add('updating');
// AI roast message
aiMessage.classList.add('ai-message', 'roast');
// Victory celebration
document.body.classList.add('victory-screen-shake');
```

---

This guide ensures consistent, engaging, and performant animations throughout your escape room terminal game! 🎮✨
