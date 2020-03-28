/*     1 */ $compiledmod = function() {var $scope146=(function($forcegbl){var $loadname148,$iter151,$loadname148,$call150,$iter151,$loadname158,$loadname158;var $wakeFromSuspension = function() {var susp = $scope146.$wakingSuspension; $scope146.$wakingSuspension = undefined;$blk=susp.$blk; $loc=susp.$loc; $gbl=susp.$gbl; $exc=susp.$exc; $err=susp.$err; $postfinally=susp.$postfinally;$currLineNo=susp.$lineno; $currColNo=susp.$colno; Sk.lastYield=Date.now();$loadname148=susp.$tmps.$loadname148;$iter151=susp.$tmps.$iter151;$call150=susp.$tmps.$call150;$loadname158=susp.$tmps.$loadname158;try { $ret=susp.child.resume(); } catch(err) { if (!(err instanceof Sk.builtin.BaseException)) { err = new Sk.builtin.ExternalError(err); } err.traceback.push({lineno: $currLineNo, colno: $currColNo, filename: '<stdin>.py'}); if($exc.length>0) { $err=err; $blk=$exc.pop(); } else { throw err; } }};var $saveSuspension = function($child, $filename, $lineno, $colno) {var susp = new Sk.misceval.Suspension(); susp.child=$child;susp.resume=function(){$scope146.$wakingSuspension=susp; return $scope146(); };susp.data=susp.child.data;susp.$blk=$blk;susp.$loc=$loc;susp.$gbl=$gbl;susp.$exc=$exc;susp.$err=$err;susp.$postfinally=$postfinally;susp.$filename=$filename;susp.$lineno=$lineno;susp.$colno=$colno;susp.optional=susp.child.optional;susp.$tmps={"$loadname148":$loadname148,"$iter151":$iter151,"$call150":$call150,"$loadname158":$loadname158};return susp;};var $gbl = $forcegbl || {}, $blk=0,$exc=[],$loc=$gbl,$cell={},$err=undefined;$loc.__file__=new Sk.builtins.str('<stdin>.py');var $ret=undefined,$postfinally=undefined,$currLineNo=undefined,$currColNo=undefined;if (typeof Sk.execStart === 'undefined') {Sk.execStart = Date.now()}if (typeof Sk.lastYield === 'undefined') {Sk.lastYield = Date.now()}if ($scope146.$wakingSuspension!==undefined) { $wakeFromSuspension(); }if (Sk.retainGlobals) {    if (Sk.globals) { $gbl = Sk.globals; Sk.globals = $gbl; $loc = $gbl; }    if (Sk.globals) { $gbl = Sk.globals; Sk.globals = $gbl; $loc = $gbl; $loc.__file__=new Sk.builtins.str('<stdin>.py');}    else { Sk.globals = $gbl; }} else { Sk.globals = $gbl; }while(true){try{var $dateNow = Date.now();if ($dateNow - Sk.execStart > Sk.execLimit) {throw new Sk.builtin.TimeLimitError(Sk.timeoutMsg())}if ($dateNow - Sk.lastYield > Sk.yieldLimit) {var $susp = $saveSuspension({data: {type: 'Sk.yield'}, resume: function() {}}, '<stdin>.py',$currLineNo,$currColNo);$susp.$blk = $blk;$susp.optional = true;return $susp;}switch($blk){case 0: /* --- module entry --- */
    /*     2 */ //
    /*     3 */ // line 1:
    /*     4 */ // total = 0
    /*     5 */ // ^
    /*     6 */ //
    /*     7 */ $currLineNo = 1;
    /*     8 */ $currColNo = 0;
    /*     9 */
    /*    10 */ $loc.total=$scope146.$const147;
    /*    11 */ //
    /*    12 */ // line 2:
    /*    13 */ // for i in range(10):
    /*    14 */ // ^
    /*    15 */ //
    /*    16 */ $currLineNo = 2;
    /*    17 */ $currColNo = 0;
    /*    18 */
    /*    19 */ var $loadname148=$loc.range!==undefined?$loc.range:Sk.misceval.loadname('range',$gbl);;$ret = Sk.misceval.callsimOrSuspendArray($loadname148, [$scope146.$const149]);$blk=4;/* allowing case fallthrough */case 4: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',2,9); }var $call150=$ret;
    /*    20 */ //
    /*    21 */ // line 2:
    /*    22 */ // for i in range(10):
    /*    23 */ //          ^
    /*    24 */ //
    /*    25 */ $currLineNo = 2;
    /*    26 */ $currColNo = 9;
    /*    27 */
    /*    28 */ var $iter151=Sk.abstr.iter($call150);$blk=1;/* allowing case fallthrough */case 1: /* --- for start --- */$ret = Sk.abstr.iternext($iter151, true);$blk=5;/* allowing case fallthrough */case 5: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',2,0); }var $next152=$ret;if($next152===undefined){$blk=2;continue;}$loc.i=$next152;
    /*    29 */ //
    /*    30 */ // line 3:
    /*    31 */ // 	total = total + i * 2
    /*    32 */ //  ^
    /*    33 */ //
    /*    34 */ $currLineNo = 3;
    /*    35 */ $currColNo = 1;
    /*    36 */
    /*    37 */ var $loadname153=$loc.total!==undefined?$loc.total:Sk.misceval.loadname('total',$gbl);;var $loadname154=$loc.i!==undefined?$loc.i:Sk.misceval.loadname('i',$gbl);;var $binop156=Sk.abstr.numberBinOp($loadname154,$scope146.$const155,'Mult');var $binop157=Sk.abstr.numberBinOp($loadname153,$binop156,'Add');$loc.total=$binop157;$blk=1;/* jump */ continue;case 2: /* --- for cleanup --- */$blk=3;/* allowing case fallthrough */case 3: /* --- for end --- */
    /*    38 */ //
    /*    39 */ // line 5:
    /*    40 */ // print(total)
    /*    41 */ // ^
    /*    42 */ //
    /*    43 */ $currLineNo = 5;
    /*    44 */ $currColNo = 0;
    /*    45 */
    /*    46 */ var $loadname158=$loc.total!==undefined?$loc.total:Sk.misceval.loadname('total',$gbl);;$ret = Sk.misceval.print_(new Sk.builtins['str']($loadname158).v);$blk=6;/* allowing case fallthrough */case 6: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',5,0); }$ret = Sk.misceval.print_("\n");$blk=7;/* allowing case fallthrough */case 7: /* --- function return or resume suspension --- */if ($ret && $ret.$isSuspension) { return $saveSuspension($ret,'<stdin>.py',5,0); }
    /*    47 */ //
    /*    48 */ // line 6:
    /*    49 */ // v= 42
    /*    50 */ // ^
    /*    51 */ //
    /*    52 */ $currLineNo = 6;
    /*    53 */ $currColNo = 0;
    /*    54 */
    /*    55 */ $loc.v=$scope146.$const159;return $loc;throw new Sk.builtin.SystemError('internal error: unterminated block');}}catch(err){ if (!(err instanceof Sk.builtin.BaseException)) { err = new Sk.builtin.ExternalError(err); } err.traceback.push({lineno: $currLineNo, colno: $currColNo, filename: '<stdin>.py'}); if ($exc.length>0) { $err = err; $blk=$exc.pop(); continue; } else { throw err; }} } });$scope146.$const147 = new Sk.builtin.int_(0);$scope146.$const149 = new Sk.builtin.int_(10);$scope146.$const155 = new Sk.builtin.int_(2);$scope146.$const159 = new Sk.builtin.int_(42);
    /*    56 */ return $scope146;}();