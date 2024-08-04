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


function findWrappingSubMenuItem() {
  var menu
  for(var i=0; i < app.menu.template.length; i++){
    menu = app.menu.template[i]
    if (menu.id == "tools") { break }
  }
  var submenu
  for(var i=0; i < menu.submenu.length; i++){
    submenu = menu.submenu[i]
    if (submenu.id == "tools.SetMarkdownTextOptions") { break }
  }
  var wrappingSubmenu
  for(var i=0; i < submenu.submenu.length; i++){
    wrappingSubmenu = submenu.submenu[i]
    if (wrappingSubmenu.id == "tool.SetMarkdownTextOptions.updateMarkdownTextWrapping") { break }
  }
  return wrappingSubmenu
}

function setMarkdownTextWrapping(onOff) {
  wrappingSubmenu = findWrappingSubMenuItem()
  if (onOff == true) {
    wrappingSubmenu.updateStates(null,null,{'format.show-shadow': true})
  } else {
    wrappingSubmenu.updateStates(null,null,{'format.auto-resize': false})
  }
}

function updateMarkdownTextWrapping() {
  wrapping = prefManager.get("SetMarkdownTextOptions::Wrapping")
  if ((!wrapping) || (wrapping == false)) {
    wrapping = true
  } else {
    wrapping = false
  }
  // prefManager.set("SetMarkdownTextOptions::Wrapping", wrapping)
  setMarkdownTextWrapping(wrapping)
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