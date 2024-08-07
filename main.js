function setDefinedMarkdownTextSize(fontSize)  {
  document.querySelectorAll('.CodeMirror').forEach(function(editor) {
    editor.style.fontSize = fontSize
  });
  // console.log("New font size set: ["+fontSize+"]")
}

function setMarkdownTextSize() {
  var currentFontSize = "default"
  document.querySelectorAll('.CodeMirror').forEach(function(editor) {
    if (editor.style.fontSize) {
      if (editor.style.fontSize != "") {
        currentFontSize = editor.style.fontSize
        currentFontSize = currentFontSize.replace("px", "")
      }
    }
  });

  app.dialogs.showInputDialog("Set Markdown Text Font Size in px (use empty for default):",""+currentFontSize).then(function ({buttonId, returnValue}) {
    if (buttonId === 'ok') {
      if ((returnValue == "") || (returnValue=="default")) {
        setDefinedMarkdownTextSize("")
        app.toast.info("Markdown font size set to it's default value")
      } else {
        if(!isNaN(Number(returnValue))) {
          setDefinedMarkdownTextSize(returnValue+'px')
          prefManager.set("SetMarkdownTextOptions::FontSize",returnValue)
          app.toast.info("Markdown font size set to: "+returnValue)
        } else {
          app.toast.error("Value ["+returnValue+"] is not a valid number.")
        }
      }
    } else {
      app.toast.warning("Set of markdown font size cancelled by the user...")
    }
  })
  return 0
}


function setMarkdownTextWrapping(onOff) {
  document.querySelectorAll('.CodeMirror').forEach(function(editor) {
    editor.CodeMirror.setOption('lineWrapping', onOff);
  });
}

function updateMarkdownTextWrapping() {
  wrapping = prefManager.get("SetMarkdownTextOptions::Wrapping")
  if ((!wrapping) || (wrapping == false)) {
    wrapping = true
  } else {
    wrapping = false
  }
  prefManager.set("SetMarkdownTextOptions::Wrapping", wrapping)
  setMarkdownTextWrapping(wrapping)
  if (wrapping == true) {
    app.toast.info("Markdown wrapping is now [ENABLED]")
  } else {
    app.toast.info("Markdown wrapping is now [DISABLED]")
  }
}


let prefManager
function init () {
  prefManager = app.preferences
  app.commands.register('SetMarkdownTextOptions:setMarkdownTextSize', setMarkdownTextSize)
  app.commands.register('SetMarkdownTextOptions:updateMarkdownTextWrapping', updateMarkdownTextWrapping)
  fontSize = prefManager.get("SetMarkdownTextOptions::FontSize")
  wrapping = prefManager.get("SetMarkdownTextOptions::Wrapping")
  if (fontSize) { setDefinedMarkdownTextSize(fontSize+"px") }
  if (wrapping) { setMarkdownTextWrapping(wrapping) }
}

exports.init = init