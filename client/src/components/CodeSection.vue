<template>
    <div class="docs-section" id="utilities">
      <h6 class="docs-header">Utilities</h6>
      <p>Skeleton has a number of small utility classes that act as easy-to-use helpers. Sometimes it's better to use a utility class than create a whole new class just to float an element.</p>
    
        <!-- CODE EXAMPLE ———————————————————————————————————————— -->
        <pre class="code-example"><code class="code-example-body prettyprint">/* Utility Classes */

        /* Make element full width */
        .u-full-width {
        width: 100%;
        box-sizing: border-box; }

        /* Make sure elements don't run outside containers (great for images in columns) */
        .u-max-full-width {
        max-width: 100%;
        box-sizing: border-box; }

        /* Float either direction */
        .u-pull-right {
        float: right; }
        .u-pull-left {
        float: left; }

        /* Clear a float */
        .u-cf {
        content: "";
        display: table;
        clear: both; }
        </code>
        </pre>
        <!-- ————————————————————————————————————————————————————— -->
    </div>
</template>