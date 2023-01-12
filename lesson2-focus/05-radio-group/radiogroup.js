"use strict";

// Define values for key codes
const VK_ENTER = 13;
const VK_SPACE = 32;
const VK_LEFT = 37;
const VK_UP = 38;
const VK_RIGHT = 39;
const VK_DOWN = 40;

// Helper function to convert NodeLists to Arrays
const slice = (nodes) => {
  return [...nodes];
};

function RadioGroup(id) {
  this.el = document.querySelector(id);
  this.buttons = slice(this.el.querySelectorAll(".radio"));
  this.focusedIdx = 0;
  this.focusedButton = this.buttons[this.focusedIdx];
  this.el.addEventListener("keydown", this.handleKeyDown.bind(this));
};

RadioGroup.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {
    case VK_UP:
    case VK_LEFT: {
      e.preventDefault();

      // This seems like a good place to do some stuff :)
      if(this.focusedIdx > 0) {
        this.focusedIdx--;
      } else {
        this.focusedIdx = this.buttons.length-1;
      }

      break;
    }

    case VK_DOWN:
    case VK_RIGHT: {
      e.preventDefault();
      if(e.target.nextElementSibling) {
        this.focusedIdx++;
      } else {
        this.focusedIdx = 0;
      }


      // This seems like a good place to do some stuff :)

      break;
    }
  }

  this.changeFocus(this.focusedIdx); // <-- Hmm, interesting...
};

RadioGroup.prototype.changeFocus = function(idx) {
  // Set the old button to tabindex -1
  this.focusedButton.tabIndex = -1;
  this.focusedButton.setAttribute("aria-checked", "false");

  // Set the new button to tabindex 0 and focus it
  this.focusedButton = this.buttons[idx];
  this.focusedButton.tabIndex = 0;
  this.focusedButton.focus();
  this.focusedButton.setAttribute("aria-checked", "true");
};

const groupOne = new RadioGroup("#group1");
