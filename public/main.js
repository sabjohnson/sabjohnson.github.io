console.log('Module definition started');

// Ensure the DOM is ready before executing the code
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document ready');

  // Initialize RequireJS configuration
  require.config({
    paths: {
      fluidSolver: './fluid.solver',
      fluidDisplay: './fluid.display',
      jquery: 'https://code.jquery.com/jquery-3.6.0.min'  // Add jQuery path
    },
  });

  // Load the required modules including jQuery
  require(['fluidSolver', 'fluidDisplay', 'jquery'], function (FluidField, FluidDisplayASCII, $) {
    console.log('Modules loaded:', { FluidField, FluidDisplayASCII });

    // Continue with the rest of the fluid initialization code
    const parentElement = document.getElementById('xp-module');
    if (!parentElement) {
      console.log('Parent element not found');
      return;
    }
    console.log('Parent element found');

    const fluid = new FluidField();
    fluid.setResolution(50, 50);

    const el_fluid = document.createElement('p');
    const disappear = document.getElementById('overlay-container');

    el_fluid.id = 'ascii-fluid';
    el_fluid.unselectable = 'on';

    const display = new FluidDisplayASCII(fluid);
    fluid.setIterations(5);
    display.Config.density = 180;

    const $el_container = $('<div />').attr('id', 'ascii-container');
    const $el_controls = $('<div />')
      .attr('id', 'ascii-controls')
      .addClass('overlay')
      .append('<br/>')
      .append(
        $('<button />')
          .text('"Disappear!"')
          .mousedown(() => {
            console.log('Disappear button clicked');
            $(el_fluid)
              .addClass('fading')
              .fadeOut('medium', () => {
                fluid.reset();
                $(el_fluid)
                  .removeClass('fading')
                  .fadeIn('fast');
              });
          })
      )
      .append('<br/><br/>');

    $el_container
      .append($el_controls)
      .append(el_fluid);
      

    // Position the fluid container as a background element
    $(parentElement).css('position', 'relative'); // Ensure the parent is positioned relative
    $(parentElement).append($el_container);
    console.log('ASCII container appended as background to parent');

    function handleResize() {
      const $parent = $(parentElement);
      const height = Math.max(20, Math.round($parent.height() / 16));
      const width = Math.max(20, Math.round($parent.width() / 8));
      fluid.setResolution(height, width);
      console.log('Resized to:', width, 'x', height);
    }

    $(window).on('resize', () => {
      console.log('Resize event triggered');
      handleResize();
    });

    setTimeout(() => {
      handleResize();
      display.bindElement(el_fluid);
      display.Animation.start();
      console.log('Fluid animation started');
    }, 100);
  });
});