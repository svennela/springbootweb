(function() {
    'use strict';

    angular
        .module('sampleApplicationApp')
        .controller('OperationDialogController', OperationDialogController);

    OperationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Operation', 'BankAccount', 'Label'];

    function OperationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Operation, BankAccount, Label) {
        var vm = this;
        vm.operation = entity;
        vm.bankaccounts = BankAccount.query();
        vm.labels = Label.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('sampleApplicationApp:operationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.operation.id !== null) {
                Operation.update(vm.operation, onSaveSuccess, onSaveError);
            } else {
                Operation.save(vm.operation, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.date = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
