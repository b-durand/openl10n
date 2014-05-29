<div class="ol-editor-source-area">
  <div class="meta pull-right">
    <span class="text-success">
      <i class="fa fa-check"></i>
    </span>

    <span><%- key %></span>
    <!-- <span class="meta-domain">(basic)</span> -->
  </div>

  <h4 class="title">
    Original phrase
  </h4>

  <p class="phrase text-default">
    <%- source_phrase %>
  </p>
</div>

<div class="ol-editor-target-area">
  <textarea class="form-control phrase-editor" placeholder="Translate here…"><%- target_phrase %></textarea>
  <p class="meta">
    <span class="info-characters pull-right">
      <!--
      Phrase length:
      <span class="phrase-length"><%- target_phrase.length %></span> /
      <span class="phrase-length-max">100</span>
      -->
    </span>
    <span class="info-tab">
      Press <strong>TAB</strong> to move to the next phrase
    </span>
  </p>
</div>

<div class="x-editor--edit-tabs" id="edit-tabs">
</div>

<div class="x-editor--edit-tabs-content">
  <div id="tab-information"></div>
  <div id="tab-history"></div>
</div>
