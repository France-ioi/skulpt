$compiledmod = function() {var $scope146=(function($forcegbl){var $loadname148,$loadname151,$loadname152;var $wakeFromSuspension = function() {var susp = $scope146.$wakingSuspension; $scope146.$wakingSuspension = undefined;$blk=susp.$blk;  $loc=susp.$loc; $gbl=susp.$gbl;  $exc=susp.$exc; $err=susp.$err; $postfinally=susp.$postfinally;$currLineNo=susp.$lineno; $currColNo=susp.$colno; Sk.lastYield=Date.now(); $loadname148=susp.$tmps.$loadname148;$loadname151=susp.$tmps.$loadname151;$loadname152=susp.$tmps.$loadname152;try { $ret=susp.child.resume(); } catch(err) { if (!(err instanceof Sk.builtin.BaseException)) { err = new Sk.builtin.ExternalError(err); } err.traceback.push({lineno: $currLineNo, colno: $currColNo, filename: '<stdin>.py'}); if($exc.length>0) { $err=err; $blk=$exc.pop(); } else { throw err; } }};var $saveSuspension = function($child, $filename, $lineno, $colno) {var susp = new Sk.misceval.Suspension(); susp.child=$child;susp.resume=function(){$scope146.$wakingSuspension=susp; return $scope146(); };susp.data=susp.child.data;susp.$blk=$blk;susp.$loc=$loc;susp.$gbl=$gbl;susp.$exc=$exc;susp.$err=$err;susp.$postfinally=$postfinally;susp.$filename=$filename;susp.$lineno=$lineno;susp.$colno=$colno;susp.optional=susp.child.optional;susp._name='<module>'; susp._argnames=[]; susp._scopename='$scope146'; susp.$tmps={"$loadname148":$loadname148,"$loadname151":$loadname151,"$loadname152":$loadname152};return susp;};var $gbl = $forcegbl || {}, $blk=0,$exc=[],$loc=$gbl,$cell={},$err=undefined;$loc.__file__=new Sk.builtins.str('<stdin>.py');var $ret=undefined,$postfinally=undefined,$currLineNo=undefined,$currColNo=undefined;if ($scope146.$wakingSuspension!==undefined) { $wakeFromSuspension(); }while(true){try{switch($blk){case 0: /* --- module entry --- */if (Sk.breakpoints('<stdin>.py',1,0)) {var $susp = $saveSuspension({data: {type: 'Sk.debug'}, resume: function() {}}, '<stdin>.py',1,0);$susp.$blk = 1;$susp.optional = true;return $susp;}$blk=1;/* allowing case fallthrough */case 1: /* --- debug breakpoint for line 1 --- */
//
// line 1:
// from database import *
// ^
//
    $currLineNo = 1;
    $currColNo = 0;

    $ret = Sk.builtin.__import__('database',$gbl,$loc,['*'],-1);$blk=2;/* allowing case fallthrough */case 2: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',1,0); }var $module147=$ret;Sk.importStar($module147,$loc, $gbl);if (Sk.breakpoints('<stdin>.py',2,0)) {var $susp = $saveSuspension({data: {type: 'Sk.debug'}, resume: function() {}}, '<stdin>.py',2,0);$susp.$blk = 3;$susp.optional = true;return $susp;}$blk=3;/* allowing case fallthrough */case 3: /* --- debug breakpoint for line 2 --- */
//
// line 2:
// toto = loadTable("grandes_villes")
// ^
//
    $currLineNo = 2;
    $currColNo = 0;

    var $loadname148=$loc.loadTable!==undefined?$loc.loadTable:Sk.misceval.loadname('loadTable',$gbl);;$ret = Sk.misceval.callsimOrSuspendArray($loadname148, [$scope146.$const149]);$blk=4;/* allowing case fallthrough */case 4: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',2,7); }var $call150=$ret;
//
// line 2:
// toto = loadTable("grandes_villes")
//        ^
//
    $currLineNo = 2;
    $currColNo = 7;

    $loc.toto=window.currentPythonRunner.reportValue($call150, 'toto');if (Sk.breakpoints('<stdin>.py',3,0)) {var $susp = $saveSuspension({data: {type: 'Sk.debug'}, resume: function() {}}, '<stdin>.py',3,0);$susp.$blk = 5;$susp.optional = true;return $susp;}$blk=5;/* allowing case fallthrough */case 5: /* --- debug breakpoint for line 3 --- */
//
// line 3:
// displayTable(toto)
// ^
//
    $currLineNo = 3;
    $currColNo = 0;

    var $loadname151=$loc.displayTable!==undefined?$loc.displayTable:Sk.misceval.loadname('displayTable',$gbl);;var $loadname152=$loc.toto!==undefined?$loc.toto:Sk.misceval.loadname('toto',$gbl);;$ret = Sk.misceval.callsimOrSuspendArray($loadname151, [$loadname152]);$blk=6;/* allowing case fallthrough */case 6: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',3,0); }var $call153=$ret;
//
// line 3:
// displayTable(toto)
// ^
//
    $currLineNo = 3;
    $currColNo = 0;

    if (Sk.breakpoints('<stdin>.py',4,0)) {var $susp = $saveSuspension({data: {type: 'Sk.debug'}, resume: function() {}}, '<stdin>.py',4,0);$susp.$blk = 7;$susp.optional = true;return $susp;}$blk=7;/* allowing case fallthrough */case 7: /* --- debug breakpoint for line 4 --- */
//
// line 4:
// pass
// ^
//
    $currLineNo = 4;
    $currColNo = 0;

    return $loc;throw new Sk.builtin.SystemError('internal error: unterminated block');}}catch(err){ if (!(err instanceof Sk.builtin.BaseException)) { err = new Sk.builtin.ExternalError(err); } err.traceback.push({lineno: $currLineNo, colno: $currColNo, filename: '<stdin>.py'}); if ($exc.length>0) { $err = err; $blk=$exc.pop(); continue; } else { throw err; }} } });$scope146.$const149 = new Sk.builtin.str('grandes_villes');
    return $scope146;}();
$compiledmod;