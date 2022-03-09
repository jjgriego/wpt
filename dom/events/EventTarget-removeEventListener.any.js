// META: title=EventTarget.removeEventListener
// META: global=window,dedicatedworker,shadowrealm

// Step 1.
test(function() {
  const et = new EventTarget();
  assert_equals(et.removeEventListener("x", null, false), undefined);
  assert_equals(et.removeEventListener("x", null, true), undefined);
  assert_equals(et.removeEventListener("x", null), undefined);
}, "removing a null event listener should succeed");
